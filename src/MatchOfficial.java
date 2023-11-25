import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MatchOfficial extends User{
    private int noOfMatches;
    private double decisionAccuracyPerc;

    public MatchOfficial(String first_name, String last_name, String username, String password, String DOB, String gender){
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = password;
        this.DOB = DOB;
        this.gender = gender;

        this.type = "MatchOfficial";
    }

    public boolean addToDatabase(){
        try {
            if(!isValidDate((DOB))) {
                System.out.println("Invalid Date format");
                return false;
            }
            Connection conn = DriverManager.getConnection(Main.connectionString);
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

        addToMatchOfficialTable();

        return true;
    }

    public void addToMatchOfficialTable(){
        try {
            Connection conn = DriverManager.getConnection(Main.connectionString);
            String sql = "INSERT INTO MATCHOFFICIAL (user_id) VALUES (?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, username);
            try{
                stmt.executeUpdate();
            }
            catch(Exception e){
                stmt.close();
                conn.close();
            }
            stmt.close();
            conn.close();
        } catch (SQLException e) {
            System.out.println("Adding match official to database failed.");
            e.printStackTrace();
        }
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
     public int getNoOfMatches() {
        return noOfMatches;
    }

    public void setNoOfMatches(int noOfMatches) {
        this.noOfMatches = noOfMatches;
    }

    public double getDecisionAccuracyPerc() {
        return decisionAccuracyPerc;
    }

    public void setDecisionAccuracyPerc(double decisionAccuracyPerc) {
        this.decisionAccuracyPerc = decisionAccuracyPerc;
    }


}
