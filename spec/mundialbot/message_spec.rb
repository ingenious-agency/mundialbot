RSpec.describe Mundialbot::Message do
  describe ".users" do
    subject { message.users }
    let(:message) { Mundialbot::Message.new(channel: "#team-general", text: text) }
    let(:text) { "Hello!" }

    it { expect(subject).to be_empty }

    context "with one mention" do
      let(:id) { "U12345" }
      let(:name) { "spengler" }
      let(:tz) { "America/Los_Angeles" }
      let(:text) { "Hello <@#{id}>" }

      before do
        slack_web = double("SlackWeb")
        allow(slack_web).to receive(:auth_test)
        allow(slack_web).to receive(:users_info).with(id).and_return(
          {data: {ok: true, user: {id: id, name: name, tz: tz}}}
        )
        Application.stub("slack_web", slack_web)
      end

      it do
        expect(subject).to include(Mundialbot::User.new(slack_id: id, name: name, tz: tz))
      end
    end

    context "with two mentions" do
      let(:first_id) { "U12345" }
      let(:first_name) { "spengler" }
      let(:first_tz) { "America/Los_Angeles" }

      let(:second_id) { "U54321" }
      let(:second_name) { "cherta" }
      let(:second_tz) { "America/Montevideo" }

      let(:text) { "Hello <@#{first_id}> <@#{second_id}>" }

      before do
        slack_web = double("SlackWeb")
        allow(slack_web).to receive(:auth_test)
        allow(slack_web).to receive(:users_info)
          .with(first_id)
          .and_return(
            data: {
              ok: true,
              user: {
                id: first_id,
                name: first_name,
                tz: first_tz
              }
            }
          )
        allow(slack_web).to receive(:users_info)
          .with(second_id)
          .and_return(
            data: {
              ok: true,
              user: {
                id: second_id,
                name: second_name,
                tz: second_tz
              }
            }
          )
        Application.stub("slack_web", slack_web)
      end

      it do
        expect(subject).to include(
          Mundialbot::User.new(slack_id: first_id, name: first_name, tz: first_tz)
        )
      end
      it do
        expect(subject).to include(
          Mundialbot::User.new(slack_id: second_id, name: second_name, tz: second_tz)
        )
      end
    end
  end
end
