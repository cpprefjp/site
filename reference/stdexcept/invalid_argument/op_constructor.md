# コンストラクタ
* stdexcept[meta header]
* std[meta namespace]
* invalid_argument[meta class]
* function[meta id-type]

```cpp
explicit invalid_argument(const string& what_arg);           // (1) C++98
constexpr explicit invalid_argument(const string& what_arg); // (1) C++26

explicit invalid_argument(const char* what_arg);             // (2) C++11
constexpr explicit invalid_argument(const char* what_arg);   // (2) C++26

invalid_argument(const invalid_argument&) noexcept;                     // (3) C++98
constexpr invalid_argument(const invalid_argument&) noexcept;           // (3) C++26
```
* string[link /reference/string/basic_string.md]

## 概要
`invalid_argument`オブジェクトを構築する。

- (1) : エラー理由の文字列を[`std::string`](/reference/string/basic_string.md)で指定して構築する
- (2) : エラー理由の文字列をヌル終端の文字列で指定して構築する
- (3) : コピーコンストラクタ


## 事後条件
- (1) : [`std::strcmp`](/reference/cstring/strcmp.md)`(`[`what()`](/reference/exception/exception/what.md)`, what_arg.`[`c_str()`](/reference/string/basic_string/c_str.md)`) == 0`
- (2) : [`std::strcmp`](/reference/cstring/strcmp.md)`(`[`what()`](/reference/exception/exception/what.md)`, what_arg) == 0`


## 例外
- (1), (2) : 文字列の複製で記憶域の確保が必要になる場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)を送出する可能性がある
- (3) : 投げない


## 備考
- (2) : C++11で追加された。文字列リテラルから[`std::string`](/reference/string/basic_string.md)の一時オブジェクトを生成せずに構築できる


## 例
```cpp example
#include <stdexcept>
#include <iostream>
#include <string>

int main()
{
  std::invalid_argument e1{"error message"};              // (2) ヌル終端文字列から構築
  std::invalid_argument e2{std::string{"error message"}}; // (1) std::stringから構築

  std::cout << e1.what() << std::endl;
  std::cout << e2.what() << std::endl;
}
```
* std::invalid_argument[color ff0000]
* e1.what()[link /reference/exception/exception/what.md]

### 出力
```
error message
error message
```


## 関連項目
- [`std::exception`](/reference/exception/exception.md)
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
