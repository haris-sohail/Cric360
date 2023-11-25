import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.sql.*;
import java.util.Vector;

public class BattingScoreCard extends JFrame{
    private JPanel panelMain;
    private JTextField txtRunsPlayer1;
    private JTextField txtBallsPlayer1;
    private JTextField txt4sPlayer1;
    private JTextField txt6sPlayer1;
    private JTextField txtRunsPlayer2;
    private JTextField txtBallsPlayer2;
    private JTextField txt4sPlayer2;
    private JTextField txt6sPlayer2;
    private JTextField txtRunsPlayer3;
    private JTextField txtBallsPlayer3;
    private JTextField txt4sPlayer3;
    private JTextField txt6sPlayer3;
    private JCheckBox checkBox1;
    private JLabel lblPlayer1;
    private JLabel lblPlayer2;
    private JLabel lblPlayer3;
    private JLabel lblPlayer4;
    private JLabel lblPlayer5;
    private JLabel lblPlayer6;
    private JLabel lblPlayer7;
    private JLabel lblPlayer8;
    private JLabel lblPlayer9;
    private JLabel lblPlayer10;
    private JLabel lblPlayer11;
    private JTextField txtRunsPlayer4;
    private JTextField txtRunsPlayer5;
    private JTextField txtRunsPlayer6;
    private JTextField txtRunsPlayer7;
    private JTextField txtRunsPlayer8;
    private JTextField txtRunsPlayer9;
    private JTextField txtRunsPlayer10;
    private JTextField txtRunsPlayer11;
    private JTextField txtBallsPlayer4;
    private JTextField txtBallsPlayer5;
    private JTextField txtBallsPlayer6;
    private JTextField txtBallsPlayer7;
    private JTextField txtBallsPlayer8;
    private JTextField txtBallsPlayer9;
    private JTextField txtBallsPlayer10;
    private JTextField txtBallsPlayer11;
    private JTextField txt4sPlayer4;
    private JTextField txt4sPlayer5;
    private JTextField txt4sPlayer6;
    private JTextField txt4sPlayer7;
    private JTextField txt4sPlayer8;
    private JTextField txt4sPlayer9;
    private JTextField txt4sPlayer10;
    private JTextField txt4sPlayer11;
    private JTextField txt6sPlayer4;
    private JTextField txt6sPlayer5;
    private JTextField txt6sPlayer6;
    private JTextField txt6sPlayer7;
    private JTextField txt6sPlayer8;
    private JTextField txt6sPlayer9;
    private JTextField txt6sPlayer10;
    private JTextField txt6sPlayer11;
    private JCheckBox checkBox2;
    private JCheckBox checkBox3;
    private JCheckBox checkBox4;
    private JCheckBox checkBox5;
    private JCheckBox checkBox6;
    private JCheckBox checkBox7;
    private JCheckBox checkBox8;
    private JCheckBox checkBox9;
    private JCheckBox checkBox10;
    private JCheckBox checkBox11;
    private JTable tableBatting;

    public JPanel getPanelMain() {
        return panelMain;
    }

    public BattingScoreCard() {
        // Set up the frame and other components as needed

        // Create a table model with columns: Name, Runs, Balls, 4s, 6s, Out
        String[] columnNames = {"Name", "Runs", "Balls", "4s", "6s", "Out"};
        DefaultTableModel model = new DefaultTableModel(columnNames, 0);

        // Load player names from the database and add rows to the table model
        loadPlayerNames(model);

        // Set the model to the table
        tableBatting.setModel(model);
    }

    private void loadPlayerNames(DefaultTableModel model) {
        String query = "SELECT User$.first_name + ' ' + User$.last_name AS PlayerName " +
                "FROM Player " +
                "INNER JOIN Team ON Player.playsInTeam = Team.name " +
                "INNER JOIN User$ ON User$.id = Player.user_id";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet resultSet = stmt.executeQuery()) {

            while (resultSet.next()) {
                // Add a row with the player name to the table model
                Vector<Object> row = new Vector<>();
                row.add(resultSet.getString("PlayerName"));
                row.add(""); // Runs
                row.add(""); // Balls
                row.add(""); // 4s
                row.add(""); // 6s
                row.add(false); // Out (checkbox, default is not out)

                model.addRow(row);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle the exception according to your needs
        }
    }


}
