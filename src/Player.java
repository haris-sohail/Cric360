import java.util.Date;

public class Player extends User{
    private int LeaderBoardRank, fantasyTeamID;
    private String playsInTeam;

    // the parameterized constructor acts as a signup function
    public Player(String first_name, String last_name, String username, String password, Date DOB, String gender){
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.DOB = DOB;
        this.gender = gender;

        this.type = "Player";
    }

    // setters and getters

    public int getLeaderBoardRank() {
        return LeaderBoardRank;
    }

    public void setLeaderBoardRank(int LeaderBoardRank) {
        this.LeaderBoardRank = LeaderBoardRank;
    }

    public int getFantasyTeamID() {
        return fantasyTeamID;
    }

    public void setFantasyTeamID(int fantasyTeamID) {
        this.fantasyTeamID = fantasyTeamID;
    }
}
