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
`any`クラスは、コピー可能なあらゆる型の値を保持できる記憶域型である。保持する値と型は動的に切り替えることができる。

```cpp
std::any x = 3; // int型の値3で初期化
x = std::string("Hello"); // std::string型の値"Hello"を再代入

// 値を取り出す
std::string s = std::any_cast<std::string>(x);
assert(s == "Hello");
```

`any`クラスは、古くからあった`void*`をより便利にし、オブジェクトの寿命管理と実行時型情報の機能が付加された型であると言える。

このクラスと同様のことは、たとえば[`std::shared_ptr`](/reference/memory/shared_ptr.md)`<void>`でも行えるが、その場合はポインタの意味論で値を保持することになり、`any`の場合は値の意味論で値を保持することになる。また、[`std::variant`](/reference/variant/variant.md)クラスも似たようなことができるが、その違いは、`variant`が代入されうる型の候補が静的に既知であることに対し、`any`はその候補を実行時まで遅らせることができるということである。同じことを実現するためにどの設計を採用するかはプログラマに委ねられる。

使用例：

- イベントハンドラに渡されるパラメータの型として使用する
    - `list<function<void(any)>>`のようなイベントのリストを保持しておき、たとえば0番目のイベントハンドラにはマウスクリック、1番目のイベントハンドラにはボタンクリックに使用すると想定する
    - マウスクリックにはイベントの引数としてクリックした位置情報 (xとy) が渡され、ボタンクリックにはイベントの引数としてボタンのIDが渡される、というような、イベントの種類ごとに引数の型が異なるという状況がでてくる
    - イベントの種類ごとに異なるイベント変数 (`function<void(Point)>`と`function<void(ButtonID)>`) を用意するかまとめて扱うかで設計選択があるが、そこで`any`を使用するという選択肢がありうる


## 要件
- 代入する型はコピー構築可能であること


## 備考
- 実装は、小さなオブジェクトを保持するためには動的メモリ確保を回避するべきである。そのようなsmall-object optimizationは、代入される型`T`が[`std::is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> == true`の場合にのみ適用されること


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](any/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](any/op_destructor.md)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](any/op_assign.md) | 代入演算子 | C++17 |
| [`emplace`](any/emplace.md)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
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
| [`make_any`](make_any.md) | `any`オブジェクトを構築する | C++17 |


### 値の取り出し

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`any_cast`](any_cast.md) | 値を取り出す | C++17 |


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
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0032R0 Homogeneous interface for `variant`, `any` and `optional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r0.pdf)
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
