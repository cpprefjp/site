# スコープを持つ列挙型
* cpp11[meta cpp]

## 概要
`enum class`で定義した列挙型は、従来の`enum`に加えて、「整数型への暗黙の型変換を行わない」「列挙型のスコープを持つ」という機能を持つ。

```cpp
enum class Color { Red, Green, Blue };

// 単にRedと指定するのではなく、どの列挙型に属するのかを指定する
Color c = Color::Red;

// 明示的な型変換は許可する
int color = static_cast<int>(Color::Red);
//int color = Color::Red; // コンパイルエラー : 暗黙の型変換はできない
```


## 仕様
- `enum class`もしくは`enum struct`で定義した列挙型は、「スコープを持つ列挙型 (scoped enumeration type)」という。`enum class`と`enum struct`に、機能の違いはない
- `enum`で定義した列挙型は、「スコープを持たない列挙型 (unscoped enumeration type)」という
- 列挙型には、型名の後ろにコロン `:` 区切りで、基底の整数型を指定できる。基底型として指定した整数型のCV修飾は無視される

    ```cpp
    // 基底型をintとする
    enum class Color : int {
      Red, Green, Blue
    };
    ```

    - 列挙子の値が基底型の範囲に収まらない場合、プログラムは不適格となる
    - 列挙型の基底型を取得するには、[`<type_traits>`](/reference/type_traits.md)ヘッダで定義される[`std::underlying_type`](/reference/type_traits/underlying_type.md)を使用する

- 列挙型は、先行宣言でも基底型を指定できる。その場合、再宣言および定義でも、同じ基底型を明示的に指定する必要がある
- スコープを持つ列挙型に基底型を指定しない場合、基底型は`int`となる
- スコープを持たない列挙型に基底型を指定しない場合、その列挙型の全ての列挙子の値を表現できる整数型のいずれかが基底型となる（どの整数型となるかは実装定義だが、すべての列挙子の値が`int`もしくは`unsigned int`に収まる限り`int`より大きな型にはならない）
- スコープを持たない列挙型の列挙子が空である場合、値`0`ひとつを列挙子として持つ
- 2つの列挙型の基底型が同じである場合、それらの列挙型は互換性のあるメモリレイアウトを持つ
- 列挙子に値を指定しない場合、最初の列挙子には定数値`0`が設定される。2つ目以降の列挙子は、ひとつ前の値を`1`進めた値を持つ


### <a id="extended-unscoped-enum" href="#extended-unscoped-enum">スコープを持つ列挙型に合わせた、enumの拡張</a>
スコープを持つ列挙型の導入に合わせて、スコープを持たない列挙型もC++11で以下の機能拡張が行われた

- 先行宣言ができるようになった
- 基底型を指定できるようになった

詳細は、上述した仕様を参照。


## 例
```cpp example
#include <cassert>
#include <type_traits>

enum class Color { Red, Green, Blue };
enum class CharColor : char { Red, Green, Blue }; // 基底型をcharにする

int main()
{
  // 単にRedと指定するのではなく、どの列挙型に属するのかを指定する
  Color c = Color::Red;

  // 明示的な型変換は許可する
  int colorValue = static_cast<int>(Color::Red);
  //int colorValue = Color::Red; // コンパイルエラー : 暗黙の型変換はできない
  assert(colorValue == 0);

  // 列挙型の基底型を取得して、その型にキャスト
  auto colorValue2 = static_cast<std::underlying_type<Color>::type>(Color::Red);
  assert(colorValue2 == 0);
}
```
* <type_traits>[link /reference/type_traits.md]
* std::underlying_type[link /reference/type_traits/underlying_type.md]
* assert[link /reference/cassert/assert.md]


### 出力
```
```


## この機能が必要になった背景・経緯
C++03は、C99の列挙型に対する改善は提供していたが、依然として以下のような問題が残っていた：

- 型の安全性
- 予期しないエラー(スコープがないことによる名前衝突、上記の型安全性の問題による予期しない型変換)
- コードのわかりやすさ(明確さ)
- コードの移植性

ECMA規格になっているC++/CLIが、現在のスコープを持つ列挙型と同等の機能を持っていたために、その経験を標準C++に取り入れることとなった。


## 関連項目
- [`underlying_type`](/reference/type_traits/underlying_type.md)


## 参照
- [N1513 Improving Enumeration Types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1513.pdf)
- [N1579 Strongly Typed Enums](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1579.pdf)
- [N1579 Strongly Typed Enums (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1719.pdf)
- [N2213 Strongly Typed Enums (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2213.pdf)
- [N2347 Strongly Typed Enums (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2347.pdf)
- [N2499 Forward declaration of enumerations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2499.pdf)

