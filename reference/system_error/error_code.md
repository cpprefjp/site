# error_code
* system_error[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class error_code;
}
```

## 概要
`error_code`は、OSのAPIで発生するエラー値およびそのエラーメッセージを扱うクラスである。

このクラス主に、[`system_error`](system_error.md)例外クラスに付加する情報として使用する。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](error_code/op_constructor.md) | コンストラクタ | C++11 |
| `~error_code() = default`                         | デストラクタ | C++11 |
| [`operator=`](error_code/op_assign.md)          | 代入演算子 | C++11 |
| [`assign`](error_code/assign.md)                | 値の再設定 | C++11 |
| [`clear`](error_code/clear.md)                  | エラー情報をクリアする | C++11 |
| [`value`](error_code/value.md)                  | エラー値を取得する | C++11 |
| [`category`](error_code/category.md)            | エラーカテゴリを取得する | C++11 |
| [`default_error_condition`](error_code/default_error_condition.md) | `error_code`に対応する`error_condition`を取得する | | C++11 |
| [`message`](error_code/message.md) | エラーメッセージを取得する | C++11 |
| [`explicit operator bool`](error_code/op_bool.md) | エラーかどうかを判定する | C++11 |


## 例
```cpp example
#include <iostream>
#include <system_error>

int main()
{
  try {
    // 不正な引数エラー
    std::error_code ec(static_cast<int>(std::errc::invalid_argument),
                       std::generic_category());

    throw std::system_error(ec, "system error!");
  }
  catch (std::system_error& e) {
    // 例外オブジェクトからerror_codeを取得
    const std::error_code& ec = e.code();

    // エラー値とメッセージを出力
    std::cout << ec.value() << std::endl;
    std::cout << ec.message() << std::endl;
  }
}
```
* std::error_code[color ff0000]
* std::errc::invalid_argument[link errc.md]
* std::generic_category()[link generic_category.md]
* std::system_error[link system_error.md]
* ec.value()[link error_code/value.md]
* ec.message()[link error_code/message.md]

### 出力
```
22
Invalid argument
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照

