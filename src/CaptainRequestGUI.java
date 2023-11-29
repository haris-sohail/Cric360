import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;
import java.util.List;

public class CaptainRequestGUI extends JFrame{
    private JPanel panelMain;
    private JList RequestsList;
    private JButton btnApprove;
    private JButton btnReject;

    public JPanel getPanelMain(){
        return panelMain;
    }

    public void updatePlayerTeamInDB(int requestID){
        // extract the username of the requesting player
        String query = "SELECT MADEBYPLAYER, requestFor FROM TEAMJOINREQUEST WHERE ID = " + requestID;

        String madeByPlayerID = "";
        String requestFor = "";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            try (ResultSet resultSet = stmt.executeQuery()) {
                // Check if there is a result
                if (resultSet.next()) {
                    madeByPlayerID = resultSet.getString("MADEBYPLAYER");
                    requestFor = resultSet.getString("requestFor");
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // update the player's team

        if (madeByPlayerID != null && requestFor != null) {
            // Execute the update query
            String queryUpdate = "UPDATE Player SET playsInTeam = ? WHERE Player.user_id = ?";

            try (Connection conn = DriverManager.getConnection(Main.connectionString);
                 PreparedStatement stmtUpdate = conn.prepareStatement(queryUpdate)) {

                // Set parameters for the update query
                stmtUpdate.setString(1, requestFor);
                stmtUpdate.setString(2, madeByPlayerID);

                // Execute the update
                int rowsUpdated = stmtUpdate.executeUpdate();

                // Check the number of rows updated if needed
                if (rowsUpdated > 0) {
                    System.out.println("Player team updated successfully.");
                } else {
                    System.out.println("No player updated. Player not found.");
                }

            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public CaptainRequestGUI() {
        populateRequestsList();
        btnApprove.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                List<String> selectedItems = RequestsList.getSelectedValuesList();

                // get the id of each selectedItem
                for (String selectedItem : selectedItems) {
                    int id = getID();
                    System.out.println("ID Returned: "+ id);
                    int requestId = getRequestID(selectedItem);
                    System.out.println("Request ID: "+ requestId);

                    // Execute SQL query
                    String query = "INSERT INTO RequestResponse (STATUS, ID, REPLYTO) VALUES ('APPROVED', ?, ?)";
                    try (Connection conn = DriverManager.getConnection(Main.connectionString);
                         PreparedStatement stmt = conn.prepareStatement(query)) {
                        stmt.setInt(1, id);
                        stmt.setInt(2, requestId);
                        stmt.executeUpdate();

                        // update the player's team
                        updatePlayerTeamInDB(requestId);
                    } catch (SQLException exception) {
                        exception.printStackTrace();
                    }
                }

                // Clear the list
                RequestsList.setModel(new DefaultListModel<>());
                populateRequestsList();

                // display success message and go back to main menu
                JOptionPane.showMessageDialog(panelMain, "Request approved!", "Success", JOptionPane.INFORMATION_MESSAGE);
                UserOperations playerOp = new UserOperations("Player");
                playerOp.userMainScreen();
                dispose();


            }
        });
        btnReject.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                List<String> selectedItems = RequestsList.getSelectedValuesList();

                // get the id of each selectedItem
                for (String selectedItem : selectedItems) {
                    int id = getID();
                    System.out.println("ID Returned: "+ id);
                    int requestId = getRequestID(selectedItem);
                    System.out.println("Request ID: "+ requestId);

                    // Execute SQL query
                    String query = "INSERT INTO RequestResponse (STATUS, ID, REPLYTO) VALUES ('REJECTED', ?, ?)";
                    try (Connection conn = DriverManager.getConnection(Main.connectionString);
                         PreparedStatement stmt = conn.prepareStatement(query)) {
                        stmt.setInt(1, id);
                        stmt.setInt(2, requestId);
                        stmt.executeUpdate();
                    } catch (SQLException exception) {
                        exception.printStackTrace();
                    }
                }

                // Clear the list
                RequestsList.setModel(new DefaultListModel<>());
                populateRequestsList();

                // display success message and go back to main menu
                JOptionPane.showMessageDialog(panelMain, "Request rejected!", "Success", JOptionPane.INFORMATION_MESSAGE);
                UserOperations playerOp = new UserOperations("Player");
                playerOp.userMainScreen();
                dispose();
            }
        });
    }

    public int getRequestID(String input){
        String[] parts = input.split(" - ");

        // Iterate through the parts and find the one containing "ID: "
        int id = -1; // Default value if ID is not found
        for (String part : parts) {
            if (part.startsWith("ID: ")) {
                // Extract the numeric value after "ID: "
                String idString = part.substring(4);
                id = Integer.parseInt(idString);
                break; // Once we find the ID, we can stop searching
            }
        }

        System.out.println("Extracted ID: " + id);
        return id;
    }

    public int getID(){
        int idReturn = 0;
        String query = "SELECT MAX(id) AS maxId FROM REQUESTRESPONSE";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet resultSet = stmt.executeQuery()) {

            while (resultSet.next()) {
                idReturn = resultSet.getInt("maxId");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ++idReturn; // the id of the current request will be incremented than the id of the last made request
    }

    private void populateRequestsList() {
        DefaultListModel<String> listModel = new DefaultListModel<>();

        // Execute SQL query
        String query = "SELECT id, message, madeByPlayer FROM TeamJoinRequest " +
                "INNER JOIN Captain ON TeamJoinRequest.requestFor = Captain.captainOf";

        try (Connection conn = DriverManager.getConnection(Main.connectionString);
             Statement stmt = conn.createStatement();
             ResultSet resultSet = stmt.executeQuery(query)) {

            // Iterate through the results and add them to the list model
            while (resultSet.next()) {
                int requestId = resultSet.getInt("id");
                String message = resultSet.getString("message");
                String madeByPlayer = resultSet.getString("madeByPlayer");
                listModel.addElement("ID: " + requestId + " - Body: " + message + " - Made by: " + madeByPlayer);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Set the custom cell renderer
        RequestsList.setCellRenderer(new RequestListCellRenderer());

        // Set the model for the JList
        RequestsList.setModel(listModel);
    }
}



