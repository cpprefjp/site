# has_identifier
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool has_identifier(info r);
}
```
* info[link info.md]

## 概要
リフレクションが識別子を持つかどうかを判定する。


## 戻り値
`r`が表すものに応じて、以下のように判定する（先に一致した項目が適用される）：

- リンケージのためのtypedef名を持つエンティティを表す場合、`true`
- 無名のエンティティを表す場合、`false`
- 型エイリアスを表す場合、テンプレート実引数を持たなければ（`!`[`has_template_arguments`](has_template_arguments.md)`(r)`）`true`
- 型を表す場合、次のいずれかであれば`true`、そうでなければ`false`：
    - CV修飾されていないクラス型であり、テンプレート実引数を持たない
    - CV修飾されていない列挙型である
- 関数を表す場合、テンプレート実引数を持たず、かつコンストラクタ・デストラクタ・演算子関数・変換関数のいずれでもなければ`true`、そうでなければ`false`
- テンプレートを表す場合、コンストラクタテンプレート・演算子関数テンプレート・変換関数テンプレートのいずれでもなければ`true`、そうでなければ`false`
- 関数パラメータを表す場合、そのパラメータがパックから実体化されるものであれば`false`。そうでなければ、到達可能なすべての宣言で同一の名前が付けられている場合に`true`、名前が付いていない、または宣言間で名前が一致しない場合は`false`

たとえば`^^int`や`^^void`のような基本型はクラス型でも列挙型でもないため`false`、列挙型`Enum`に対する`^^Enum`は`true`となる。


## 例
```cpp example
#include <meta>

void func(int x, int);

int main() {
  static_assert(std::meta::has_identifier(
    std::meta::parameters_of(^^func)[0]));   // "x"という名前がある
  static_assert(!std::meta::has_identifier(
    std::meta::parameters_of(^^func)[1]));  // 名前がない
}
```
* std::meta::parameters_of[link parameters_of.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
- [LWG Issue 4435. `meta::has_identifier` doesn't handle all types](https://cplusplus.github.io/LWG/issue4435)
    - C++26で、戻り値の規定が整理され、`^^int`・`^^void`・`^^Enum`のような従来未規定だった型に対する結果が明確化された（型エイリアスを型より先に判定し、クラス型・列挙型にCV修飾なしの条件を付ける等）
- [LWG Issue 4478. `meta::has_identifier` is not specified for annotations](https://cplusplus.github.io/LWG/issue4478)
    - C++26で、データメンバ記述などの未規定だったケースについての戻り値が明確化された
