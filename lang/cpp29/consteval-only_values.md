# consteval-only型の規則をconsteval-only値の規則へ置き換え [P4101R1]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、[C++26の静的リフレクション](/lang/cpp26/reflection.md)がリフレクションを実行時へ漏らさないために採用していた「consteval-only型」の規則が、「consteval-only値」にもとづく規則へ置き換えられる。

consteval-only型のモデルでは、[`std::meta::info`](/reference/meta/info.md)をどこかに含む型（ポインタ・参照・関数型・メンバを含むクラス型など）がすべてconsteval-only型となり、その型のオブジェクトは実行時に存在できなかった。C++29のconsteval-only値のモデルでは、型ではなく次の値が定数評価の外へ出ることを禁止する。

- ヌルリフレクションではないリフレクション値
- 即時関数（`consteval`関数）や即時オブジェクトを指すポインタ・メンバポインタ（構成要素として含む場合も同様）

これによって、規則の対象が「実際にリフレクションを保持している値」に限定され、ユーザーから見て次のような変化がある。

```cpp
constexpr std::meta::info r = ^^int;  // OK（従来どおり）

std::meta::info a;          // OK: ヌルリフレクションのみを保持するinfoオブジェクトは、
                            //     実行時にも存在できる（consteval-only型の規則では不適格だった）
std::meta::info b = ^^int;  // コンパイルエラー！非ヌルのリフレクションは実行時へ持ち出せない

void f(std::meta::info);    // OK: constevalではない関数のパラメータにも使用できる
                            //     （実行時に渡せる値はヌルリフレクションのみ）

std::meta::info const* p = &r;            // コンパイルエラー！即時オブジェクトを指すポインタを
                                          // 保持するオブジェクトは、constexpr変数でなければならない
constexpr std::meta::info const* q = &r;  // OK
```

また、リフレクションを保持しうるだけの型が排除されなくなるため、[`std::variant`](/reference/variant/variant.md)`<std::meta::info, int>`に`int`を入れて実行時に使う、[`std::vector`](/reference/vector/vector.md)`<std::meta::info>`を定数評価中に使う、といったコードも適格となる。

この変更は、C++26のリフレクションの設計に対する修正として提案され、C++29のワーキングドラフトへ適用された。


## 仕様
- consteval-only値は、以下のいずれかである
    - ヌルリフレクション値ではないリフレクション値
    - 即時関数、または即時オブジェクト（の途中や末尾の次）を指すポインタ・メンバポインタ
- 完全オブジェクトが「consteval-onlyな構成要素の値」または「即時オブジェクト・即時関数への構成要素の参照」を持つオブジェクトを、即時オブジェクトと呼ぶ。すべての即時オブジェクトは、以下のいずれかでなければならない
    - `constexpr`変数に対応するオブジェクトまたはその部分オブジェクト
    - テンプレートパラメータオブジェクトまたはその部分オブジェクト
    - 定数式のコア定数式としての評価中に生存期間が開始・終了するオブジェクト
- 即時オブジェクトを宣言または参照する変数をodr使用する式は、即時関数文脈になければならない（翻訳単位をまたぐ場合など、診断が要求されない場合がある）
- 定数式のエスカレーション（即時エスカレーション式）の規則が、consteval-only型ではなくconsteval-only値と即時オブジェクトにもとづいて定義し直される
- consteval-only型の規則は削除され、予定されていた型特性`std::is_consteval_only`／[`std::meta::is_consteval_only_type()`](/reference/meta.md)も削除された
- 機能テストマクロ`__cpp_consteval`の値が`202606L`に更新される


## 例
```cpp
#include <meta>
#include <vector>
#include <iostream>

// constevalではない関数でもstd::meta::infoのパラメータを宣言できる
// （実行時に渡せる値はヌルリフレクションのみ）
bool is_null(std::meta::info r) {
  return r == std::meta::info{};
}

int main() {
  std::meta::info a;  // ヌルリフレクションで初期化される
  std::cout << std::boolalpha << is_null(a) << std::endl;

  // 定数評価の中であれば、リフレクションを要素とするvectorも使用できる
  static_assert([] {
    std::vector<std::meta::info> v = {^^int, ^^char};
    return v.size() == 2;
  }());
}
```

### 出力
```
true
```


## この機能が必要になった背景・経緯
consteval-only型の規則には、次のような問題が見つかっていた。

- 型がconsteval-onlyかどうかはメンバの型に依存するため、不完全型に対しては判定できない。後からクラスの定義が現れることで、以前の関数宣言が遡って不適格になるのか、といった問いに答えられなかった（CWG 3150）
- 関数型もconsteval-only型になりうるため、`void f(S<int>*);`のような宣言の妥当性を判定するためだけに`S<int>`のインスタンス化が必要になってしまう
- `std::vector<std::meta::info>`のデストラクタは`std::meta::info*`型のメンバを扱うため即時エスカレーションが必要になるが、デストラクタはエスカレーションできず、技術的には不適格だった（CWG 3105）

値にもとづく規則では、定数評価中の値は常に完全であるためこれらの問題がそもそも発生しない。規則もより単純になり、処理系の実装コストとコンパイル時間の両面で有利であることから、モデルごと置き換えられた。あわせて、ヌルリフレクションをconsteval-onlyとしない設計としたことで、実行時の`std::meta::info`オブジェクトの存在自体を追跡・排除する型ベースの機構が不要になっている。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 即時関数としての`consteval`関数](/lang/cpp20/immediate_functions.md)
- [C++26 静的リフレクション](/lang/cpp26/reflection.md)
- [`std::meta::info`](/reference/meta/info.md)


## 参照
- [P4101R1 Consteval-only Values for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4101r1.html)
- [CWG Issue 3150. Incomplete consteval-only class types](https://cplusplus.github.io/CWG/issues/3150.html)
    - 型がconsteval-onlyかどうかを不完全型に対して判定できないという指摘。本提案の直接の動機となった
