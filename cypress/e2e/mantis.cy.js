describe("Caminho Feliz", () => {
  let issue_id;

  beforeEach("Fazer Login", () => {
    cy.fixture("credential").then((credentials) => {
      cy.session("login", () => {
        cy.visit("https://mantis-prova.base2.com.br/login_page.php");
        cy.get("#username").type(credentials.user);
        cy.get('input[type="submit"].btn-success').click();
        cy.get("#password").type(credentials.pw);
        cy.get('input[type="checkbox"][id="secure-session"]').uncheck({
          force: true,
        });
        cy.get('input[type="submit"].btn-success').click();
        cy.wait(5000)
      });
    });
  });

  it("Criar Issue", () => {
    cy.visit("https://mantis-prova.base2.com.br/my_view_page.php");
    cy.get('a.btn.btn-primary.btn-sm[href="bug_report_page.php"]').click();
    cy.get("select#category_id").select("[Todos os Projetos] categoria teste");
    cy.get("select#reproducibility").select("sempre");
    cy.get("select#severity").select("pequeno");
    cy.get("select#priority").select("baixa");
    cy.get("i.fa.fa-plus-square-o").then(($plusElement) => {
      if ($plusElement.is(":visible")) {
        cy.wrap($plusElement).click();
      } else {
        cy.get("i.fa.fa-minus-square-o").then(($minusElement) => {
          if ($minusElement.is(":visible")) {
            cy.log(
              'O elemento "-" está visível, portanto apenas continuando com os testes.'
            );
          } else {
            cy.log("Nenhum elemento visível que requer ação específica.");
          }
        });
      }
    });
    cy.get("#platform").type("Desktop");
    cy.get("#os").type("Windows11");
    cy.get("#os_build").type("23H2");
    cy.get("#summary").type("Bluetooth desconecta ao reiniciar");
    cy.get("#description").type(
      "Ao reiniciar todos os dispositivos bluetooth desconectam, exigindo um novo pareamento"
    );
    cy.get("#steps_to_reproduce").type(
      "Reiniciar o computador com dispositivo bluetooth pareado"
    );
    cy.get("#additional_info").type("Dispositivo utilizado: Logitech MX Keys");
    cy.get("#tag_string").type("bluetooth");
    cy.get("select#tag_select").select("bug");
    cy.fixture("screenshot.jpg").then((fileContent) => {
      cy.get(".dropzone").trigger("drop", {
        dataTransfer: {
          files: [
            new File([fileContent], "screenshot.jpg", { type: "image/jpeg" }),
          ],
        },
      });
    });
    cy.get('input[type="submit"][value="Criar Nova Tarefa"]').click();
    cy.wait(5000);
    // cy.get("td.bug-id")
    //   .invoke("text")
    //   .then((text) => {
    //     //issue_id = text.trim();
    //     cy.wrap(text.trim()).as("issueId");
    //     issue_id = issueID;
    //     cy.log("Issue ID: " + issue_id);
    //   });
    // cy.wait(5000);
    // cy.visit(`https://mantis-prova.base2.com.br/view.php?id=${ Cypress.env("issue_id")}`);
    // cy.get("td.bug-id")
    //   .invoke("text")
    //   .then((text) => {
    //     issue_id = text.trim();
    //     cy.wrap(issue_id).should("eq", text.trim());
    //   });
  });

  it("Fazer Logout", () => {
    cy.visit('https://mantis-prova.base2.com.br/view_all_bug_page.php'),
    cy.wait(5000);
    cy.get("span.user-info:contains('Agenor_Neto')").click();
    cy.get('a[href="/logout_page.php"]').click();
  });
});