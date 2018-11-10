# any
* any[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  class any;
}
```

## 概要



## 要件



## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](any/op_constructor.md.nolink) | コンストラクタ | C++17 |
| [`(destructor)`](any/op_destructor.md.nolink)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](any/op_assign.md.nolink) | 代入演算子 | C++17 |
| [`emplace`](any/emplace.md.nolink)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
| [`swap`](any/swap.md)           | 他の`any`オブジェクトとデータを入れ替える | C++17 |
| [`reset`](any/reset.md)         | 有効値を保持していない状態にする | C++17 |


### 値の観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`has_value`](any/has_value.md) | 有効な値を保持しているかを判定する | C++17 |
| [`type`](any/type.md)           | 保持している値の型情報を取得する | C++17 |


## 非メンバ関数
### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_any`](make_any.md.nolink) | `any`オブジェクトを構築する | C++17 |


### 値の取り出し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`any_cast`](any_cast.md.nolink) | 値を取り出す | C++17 |


### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](any/swap_free.md) | 2つの`any`オブジェクトを入れ替える | C++17 |


## 例
```cpp example
#include <iostream>
#include <any>

int main()
{
  // int型の値を代入して取り出す
  std::any x = 3;
  int n = std::any_cast<int>(x);

  std::cout << n << std::endl;

  // 文字列を再代入して取り出す
  x = "Hello";
  const char* s = std::any_cast<const char*>(x);

  std::cout << s << std::endl;

  // 間違った型で取り出そうとすると例外が送出される
  try {
    std::any_cast<double>(x);
  }
  catch (std::bad_any_cast& e) {
    std::cout << e.what() << std::endl;
  }
}
```
* std::any[color ff0000]
* std::any_cast[link any_cast.md.nolink]
* std::bad_any_cast[link bad_any_cast.md]

### 出力例
```
3
Hello
bad any_cast
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
