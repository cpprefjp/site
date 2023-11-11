# error_condition
* system_error[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class error_condition;
}
```

## 概要
`error_condition`は、[`error_code`](error_code.md)に紐付くエラーを表現することを可能にするためのクラスである。

Visual C++ 2010、GCC 4.6.1では[`generic_category()`](generic_category.md)と[`system_category()`](system_category.md)の[`error_category`](error_category.md)オブジェクトは[`name()`](error_category/name.md)メンバ関数を除いて同じ挙動を行い、それぞれの[`default_error_condition()`](error_category/default_error_condition.md)メンバ関数も同じエラー値、同じカテゴリの`error_condition`を構築するため、実質[`error_code`](error_code.md)と`error_condition`は標準カテゴリでは等価な動作をする。だが、[`error_category`](error_category.md)を継承した新たなカテゴリを定義することにより、以下のようなエラーを表現することが可能となる：

- 一つのエラー値で上位Nビット、下位Nビットで異なるエラー情報を表現する
- 例： WindowsのHRESULT : 「[HRESULT型とは？ - UsefullCode.net](https://web.archive.org/web/20230323103136/http://www.usefullcode.net/2007/03/hresult.html)」
- システムのエラーコードを汎用のエラーコードに変換し、[`error_code`](/reference/system_error/error_code.md)にはシステムの環境依存エラー値、`error_condition`には環境依存しない汎用エラー値を格納する


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](error_condition/op_constructor.md) | コンストラクタ | C++11 |
| `~error_condition() = default`                         | デストラクタ | C++11 |
| [`operator=`](error_condition/op_assign.md)          | 代入演算子 | C++11 |
| [`assign`](error_condition/assign.md)                | 値の再設定 | C++11 |
| [`clear`](error_condition/clear.md)                  | エラー情報をクリアする | C++11 |
| [`value`](error_condition/value.md)                  | エラー値を取得する | C++11 |
| [`category`](error_condition/category.md)            | エラーカテゴリを取得する | C++11 |
| [`message`](error_condition/message.md)              | エラーメッセージを取得する | C++11 |
| [`explicit operator bool`](error_condition/op_bool.md) | エラーかどうかを判定する | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](op_equal.md) | 等値比較 | C++11 |
| [`operator!=`](op_not_equal.md) | 非等値比較 (C++20から`operator==`により使用可能) | C++11 |
| [`operator<=>`](error_condition/op_compare_3way.md) | 三方比較 | C++20 |
| [`operator<`](error_condition/op_less.md) | 左辺が右辺より小さいか判定する (C++20から`operator<=>`により使用可能) | C++11 |
| `bool operator<=(const error_condition&, const error_condition&) noexcept;` | 左辺が右辺以下か判定する (`operator<=>`により使用可能) | C++20 |
| `bool operator>(const error_condition&, const error_condition&) noexcept;` | 左辺が右辺より大きいか判定する (`operator<=>`により使用可能) | C++20 |
| `bool operator>=(const error_condition&, const error_condition&) noexcept;` | 左辺が右辺以上か判定する (`operator<=>`により使用可能) | C++20 |

| [`make_error_condition`](make_error_condition.md) | `errc`から`error_condition`オブジェクトを生成する | C++11 |


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

    // error_codeからerror_conditionを取得
    const std::error_condition& cond = ec.default_error_condition();

    // エラー値とメッセージを出力
    std::cout << cond.value() << std::endl;
    std::cout << cond.message() << std::endl;
  }
}
```
* std::error_condition[color ff0000]
* std::errc::invalid_argument[link errc.md]
* std::generic_category()[link generic_category.md]
* std::system_error[link system_error.md]
* std::error_code[link error_code.md]
* ec.default_error_condition()[link error_code/default_error_condition.md]
* cond.value()[link error_condition/value.md]
* cond.message()[link error_condition/message.md]

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
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照

