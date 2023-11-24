import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Player extends User{
    private int LeaderBoardRank, fantasyTeamID;
    private String playsInTeam;

    // the parameterized constructor acts as a signup function
    public Player(String first_name, String last_name, String username, String password, String DOB, String gender){
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.DOB = DOB;
        this.gender = gender;
        this.type = "Player";
    }

    public boolean addToDatabase(){
        try {
            if(!isValidDate((DOB))) {
                System.out.println("Invalid Date format");
                return false;
            }
            Connection conn = DriverManager.getConnection("jdbc:sqlserver://DESKTOP-M9UAP31\\SQLEXPRESS:60091;Database=Cric360;IntegratedSecurity=true;trustServerCertificate=true");
            String sql = "INSERT INTO USER$ (ID, first_name, last_name, username, password, DOB, gender, type) VALUES (?,?,?,?,?,?,?,?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);
            stmt.setString(2, first_name);
            stmt.setString(3, last_name);
            stmt.setString(4, username);
            stmt.setString(5, password);
            stmt.setString(6, DOB);
            stmt.setString(7, gender);
            stmt.setString(8, type);
            try{
                stmt.executeUpdate();
            }
            catch(Exception e){
                System.out.println("Username already taken.");
                stmt.close();
                conn.close();
                return false;
            }
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            System.out.println("Adding user to database failed.");
            e.printStackTrace();
        }
        return true;
    }

    private static boolean isValidDate(String dateStr) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yy");
        sdf.setLenient(false);

        try {
            //parse the string to date
            Date date = sdf.parse(dateStr);
            //If the parsing is successful, then the date is valid
            return true;
        } catch (ParseException e) {
            //Parsing failed, the date is not valid
            return false;
        }
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
