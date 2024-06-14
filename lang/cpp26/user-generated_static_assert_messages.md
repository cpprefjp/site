# static_assertの診断メッセージにユーザーが生成した文字列の指定を許可 [P2741R3]
* cpp26[meta cpp]

## 概要
C++26では、[`static_assert`](/lang/cpp11/static_assert.md)に指定する表明失敗時の診断メッセージとして、文字列リテラルだけでなくユーザー定義型の文字列オブジェクトも指定できるようになる。

例えば、将来的に[`std::format()`](/reference/format/format.md)関数が`constexpr`対応した場合、それによって作られた[`std::string`](/reference/string/basic_string.md)オブジェクトを診断メッセージとして使用できる。

```cpp example
#include <cstdint>
#include <format>

template <class T>
void f()
{
  static_assert(
    sizeof(T) == 4,
    std::format("type T size should 4, actual:{}", sizeof(T))
  );
}

int main()
{
  f<std::int32_t>(); // OK
  f<std::int64_t>(); // Error! "type T size should 4, actual:8"
}
```


## 仕様
`static_assert`の構文において、

```
static_assert(定数式, 診断メッセージ);
```

診断メッセージが文字列リテラルでない場合、そのオブジェクトMは、以下の要件を満たすこと：

- `M.size()`から[`std::size_t`](/reference/cstddef/size_t.md)への暗黙変換が定数式であること
- `M.data()`から「`const char`へのポインタ」への暗黙変換が定数式であること
- メッセージのシーケンスに含まれる各文字が、エンコーディング指定されていない文字コード (ordinary literal encoding) であること
    - `u8"message"`はNG
    - `"message"`はOK


## 関連項目
- [C++11 コンパイル時アサート](/lang/cpp11/static_assert.md)


## 参照
- [P2741R3 user-generated `static_assert` messages](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2741r3.pdf)
