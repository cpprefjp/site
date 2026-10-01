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
* std::any_cast[link any_cast.md]

`any`クラスは、古くからあった`void*`をより便利にし、オブジェクトの寿命管理と実行時型情報の機能が付加された型であると言える。

このクラスと同様のことは、たとえば[`std::shared_ptr`](/reference/memory/shared_ptr.md)`<void>`でも行えるが、その場合はポインタの意味論で値を保持することになり、`any`の場合は値の意味論で値を保持することになる。また、[`std::variant`](/reference/variant/variant.md)クラスも似たようなことができるが、その違いは、`variant`が代入されうる型の候補が静的に既知であることに対し、`any`はその候補を実行時まで遅らせることができるということである。同じことを実現するためにどの設計を採用するかはプログラマに委ねられる。


## 要件
- 代入する型はコピー構築可能であること


## 備考
- 実装は、小さなオブジェクトを保持するためには動的メモリ確保を回避するべきである。そのようなsmall-object optimizationは、代入される型`T`が[`std::is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> == true`の場合にのみ適用されること

### 応用事例
`any`のような型消去された値は広く使われている。用途は、値の型を静的に決められない理由によって4つに分かれる。

1つめは、キーごとに値の型が異なるマップを作る使い方である。マップの値型をひとつに固定できないため、値を型消去して保持する。

- オプションの設定値を名前から引く。オプションごとに値の型が異なるため、値型を固定できない
    - Boost.Program_optionsの[`variable_value`](https://www.boost.org/doc/libs/1_83_0/doc/html/boost/program_options/variable_value.html)は、コマンドラインオプションの値を`boost::any`で保持し、`as<T>()`メンバ関数で取り出す
- 処理の段階をまたいで情報を引き継ぐ。前段が入れた値を後段が取り出すが、何を入れるかは枠組みの側が知りえない
    - WebアプリケーションフレームワークのDrogonは、リクエストごとのコンテキストを[`std::map`](/reference/map/map.md)`<`[`std::string`](/reference/string/basic_string.md)`, std::any>`で保持する ([`drogon::Attributes`](https://github.com/drogonframework/drogon/blob/master/lib/inc/drogon/Attribute.h))。認証処理が入れたユーザー情報を、後続のハンドラが名前で取り出す
- UIの部品が表示・編集する値を、部品の種類から独立して扱う
    - Qtの[`QVariant`](https://doc.qt.io/qt-6/qvariant.html)は、プロパティシステムやモデル/ビューのデータ (`QAbstractItemModel::data()`の戻り値) に使われる

2つめは、フレームワークとユーザーコードの境界で任意の値を預かる使い方である。C言語のAPIにあった`void*`のユーザーデータを、寿命管理と型の検査が付いたかたちで置き換える。

- イベントやコールバックに渡す引数の型が、通知の種類ごとに異なる。`list<function<void(any)>>`のようにハンドラをひとつのリストでまとめて扱うには、引数の型を型消去する。たとえばマウスクリックには位置情報 (xとy) が渡され、ボタンクリックにはボタンのIDが渡される、という状況である。イベントの種類ごとに別の変数 (`function<void(Point)>`と`function<void(ButtonID)>`) を用意するか、まとめて扱うかの設計選択になる
    - LLVMの新しいパスマネージャは、パスの実行前後に呼ばれるコールバックへ、処理対象のIRユニット (`Module`・`Function`・`Loop`など) へのポインタを`llvm::Any`に包んで渡す ([`PassInstrumentationCallbacks`](https://llvm.org/doxygen/PassInstrumentation_8h_source.html))。コールバックの宣言をIRユニットの型から独立させるためである。`std::any`へ置き換えるRFCも出ている ([RFC: Switching from llvm::Any to std::any](https://discourse.llvm.org/t/rfc-switching-from-llvm-any-to-std-any/67176))
- ライブラリが、ユーザーが決めた型の状態を預かる。ライブラリ側の型にユーザーの型が現れないようにする
    - ゲーム向けのEnTTは、型をキーにして任意の値を保持するcontextを`entt::any`でもつ ([Crash Course: entity component system](https://skypjack.github.io/entt/md_docs_2md_2entity.html))。時間やカメラのようにシステム間で共有する状態を、ライブラリ側の型に現れないかたちで持たせる

3つめは、処理する対象によって結果の型が変わる処理の受け渡しである。

- 異種のノードからなる木を走査する処理は、ノードの種類ごとに結果の型が異なる。走査の枠組みの側は結果の型を固定できない
    - ANTLRが生成するC++のパーサは、構文木を走査するvisitorの戻り値型に`std::any`を使う。バージョン4.10で、独自の`antlrcpp::Any`から置き換えられた ([[C++] Switch to std::any and deprecate antlrcpp::Any](https://github.com/antlr/antlr4/pull/3395))

4つめは、実行時に型情報をたどって値を読み書きする機能での、値の表現である。

- リフレクションでプロパティを読み書きする場合、どの型のプロパティを扱うかが実行時に決まるため、値の受け渡しに使う型を固定できない
    - リフレクションライブラリのRTTRは、プロパティの読み書きに[`rttr::variant`](https://www.rttr.org/doc/master/classrttr_1_1variant.html)を使う
    - EnTTの`entt::meta_any`も同様に、実行時に解決した型の値を保持する

いずれの事例でも、値の型の候補が静的に既知であれば[`std::variant`](/reference/variant/variant.md)のほうが適する。`any`を選ぶのは、候補を実行時まで決められない場合か、ライブラリ側が候補を知りえない場合である。


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
### 基本的な使い方
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
* std::any_cast[link any_cast.md]
* std::bad_any_cast[link bad_any_cast.md]

#### 出力例
```
3
Hello
bad any_cast
```

### イベントハンドラのパラメータとして使用する
```cpp example
#include <iostream>
#include <any>
#include <functional>
#include <map>

struct Point {
  int x;
  int y;
};

enum class ButtonID {
  ok,
  cancel,
};

// イベントの種類
enum class EventID {
  mouse_click,
  button_click,
};

int main()
{
  // イベントの種類ごとに引数の型が異なるハンドラを、ひとつのマップで扱う
  std::map<EventID, std::function<void(const std::any&)>> handlers;

  // マウスクリック : 位置が渡される
  handlers[EventID::mouse_click] = [](const std::any& arg) {
    const Point& p = std::any_cast<const Point&>(arg);
    std::cout << p.x << "," << p.y << std::endl;
  };

  // ボタンクリック : ボタンのIDが渡される
  handlers[EventID::button_click] = [](const std::any& arg) {
    ButtonID id = std::any_cast<ButtonID>(arg);
    std::cout << static_cast<int>(id) << std::endl;
  };

  // イベントを発生させる
  handlers[EventID::mouse_click](Point{3, 4});
  handlers[EventID::button_click](ButtonID::cancel);
}
```
* std::any[color ff0000]
* std::any_cast[link any_cast.md]
* std::function[link /reference/functional/function.md]

#### 出力
```
3,4
1
```

### キーごとに型が異なる値を保持する
```cpp example
#include <iostream>
#include <any>
#include <map>
#include <string>

int main()
{
  // キーごとに値の型が異なる設定を、ひとつのマップで保持する
  std::map<std::string, std::any> config;
  config["host"] = std::string("localhost");
  config["port"] = 8080;
  config["debug"] = true;

  std::cout << std::any_cast<std::string>(config["host"]) << std::endl;
  std::cout << std::any_cast<int>(config["port"]) << std::endl;
  std::cout << std::boolalpha << std::any_cast<bool>(config["debug"]) << std::endl;
}
```
* std::any[color ff0000]
* std::any_cast[link any_cast.md]

#### 出力
```
localhost
8080
true
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
