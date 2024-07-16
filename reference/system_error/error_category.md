# error_category
* system_error[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class error_category;
}
```

## 概要
`error_category`クラスは、エラー情報を分類するための基底クラスである。

エラーコードから対応するエラーメッセージを取得する処理が異なる場合などで、`error_category`クラスを派生して環境固有のエラー情報を取得するためのクラスを定義できる。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](error_category/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](error_category/op_destructor.md)   | デストラクタ | C++11 |
| `operator=(const error_category&) = delete`           | 代入演算子(使用不可) | C++11 |
| [`default_error_condition`](error_category/default_error_condition.md) | エラー値と自身のカテゴリから`error_condition`を生成 | C++11 |

### 比較

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`equivalent`](error_category/equivalent.md) | エラーコードとエラー状態の等値比較 | C++11 |
| [`operator==`](error_category/op_equal.md) | 等値比較 | C++11 |
| [`operator!=`](error_category/op_not_equal.md) | 非等値比較 (C++20から`operator==`により使用可能) | C++11 |
| [`operator<=>`](error_category/op_compare_3way.md) | 三方比較 | C++20 |
| [`operator<`](error_category/op_less.md) | 左辺が右辺より小さいか比較 (C++20から`operator<=>`により使用可能) | C++11 |
| `bool operator<=(const error_category&) const noexcept;` | 左辺が右辺以下か比較 (`operator<=>`により使用可能) | C++20 |
| `bool operator>(const error_category&) const noexcept;` | 左辺が右辺より大きいか比較 (`operator<=>`により使用可能) | C++20 |
| `bool operator>=(const error_category&) const noexcept;` | 左辺が右辺以上か比較 (`operator<=>`により使用可能) | C++20 |

### 純粋仮想関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`name`](error_category/name.md) | カテゴリ名を取得 | C++11 |
| [`message`](error_category/message.md) | エラーコードに対応するメッセージを取得 | C++11 |


## 例
```cpp example
#include <iostream>
#include <system_error>
#include <string>

class user_defined_error_category : public std::error_category {
public:
  const char* name() const noexcept override
  {
    return "user defined error";
  }

  std::string message(int ev) const override
  {
    return "error message";
  }
};

const std::error_category& user_defined_category()
{
  static user_defined_error_category cat;
  return cat;
}

int main()
{
  const std::error_category& cat = user_defined_category();
  std::cout << cat.name() << std::endl;
}
```
* std::error_category[color ff0000]

### 出力
```
user defined error
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照

