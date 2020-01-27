# regex_error
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class regex_error : public std::runtime_error;
}
```
* std::runtime_error[link /reference/stdexcept.md]

## 概要
`regex_error`クラスは、�規表現ライブラリ`<regex>`からのエラー報告として送出される、例外オブジェクトの型である。

有効ではない�規表現が入力された場合に送出される。

エラーとなった理由は、[`what()`](/reference/stdexcept.md)メンバ関数によってエラーメッセージ文�列として取得できるほか、[`code()`](regex_error/code.md)メンバ関数によって[`regex_constants::error_type`](regex_constants/error_type.md)型のエラーコード値としても取得できる。


## メンバ関数

基底クラスである[`runtime_error`](/reference/stdexcept.md)も参照のこと。

### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](regex_error/op_constructor.md) | コンストラクタ | C++11 |
| `~regex_error() = default;`  | デストラクタ | C++11 |
| `regex_error& operator=(const regex_error&) = default;`<br/> `regex_error& operator=(regex_error&&) = default;` | 代入演算� | C++11 |


### エラー内容

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`code`](regex_error/code.md) | エラーコードを取得する | C++11 |


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

std::string code_to_string(std::regex_constants::error_type e)
{
  using namespace std::regex_constants;
  switch (e) {
    case error_collate:    return "error collapse";
    case error_ctype:      return "error ctype";
    case error_escape:     return "error escape";
    case error_backref:    return "error back reference";
    case error_brack:      return "error bracket";
    case error_paren:      return "error paren";
    case error_brace:      return "error brace";
    case error_badbrace:   return "error bad brace";
    case error_range:      return "error range";
    case error_space:      return "error space";
    case error_badrepeat:  return "error bad repeat";
    case error_complexity: return "error complexity";
    case error_stack:      return "error stack";
    default:
      throw std::invalid_argument("invalid error code");
  }
}

int main()
{
  try {
    std::regex re("("); // 開きカッコに対応する閉じカッコがない�規表現を指定
  }
  catch (std::regex_error& e) {
    std::cout << code_to_string(e.code()) << std::endl;
    std::cout << e.what() << std::endl;
  }
}
```
* std::regex_error[color ff0000]
* std::regex_constants::error_type[link /reference/regex/regex_constants/error_type.md]
* std::invalid_argument[link /reference/stdexcept.md]
* std::regex[link /reference/regex/basic_regex.md]
* code()[link regex_error/code.md]

### 出力例
```
error paren
The expression contained mismatched ( and ).
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

