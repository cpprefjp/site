# basic_osyncstream
* syncstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]
* osyncstream,wosyncstream[meta alias]

```cpp
namespace std {
  template<class charT, class traits, class Allocator>
  class basic_osyncstream : public basic_ostream<charT, traits> { ... };

  using osyncstream = basic_osyncstream<char>;
  using wosyncstream = basic_osyncstream<wchar_t>;
}
```
* basic_ostream[link ../ostream/basic_ostream.md]


## 概要
同じストリームへアトミックに出力するメカニズムを提供する。

| エイリアス | 説明 | 対応バージョン |
|------------|------|----------------|
| `osyncstream`  | `basic_osyncstream<char>` | C++20 |
| `wosyncstream` | `basic_osyncstream<wchar_t>` | C++20 |


## メンバ

基底クラスである [`basic_ostream`](../ostream/basic_ostream.md) も参照のこと。

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](basic_osyncstream/op_constructor.md) | コンストラクタ | C++20 |
| [`(destructor)`](basic_osyncstream/op_destructor.md)   | デストラクタ   | C++20 |

### 割り当て

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator=`](basic_osyncstream/op_assign.md) | 代入演算子 | C++20 |

### その他メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`emit`](basic_osyncstream/emit.md) | ベースとなる[`basic_syncbuf`](basic_syncbuf.md)に対して`emit()`を呼び出す | C++20 |
| [`get_wrapped`](basic_osyncstream/get_wrapped.md) | ベースとなる[`basic_syncbuf`](basic_syncbuf.md)に対して`get_wrapped()`を呼び出す | C++20 |
| [`rdbuf`](basic_osyncstream/rdbuf.md) | ベースとなる`std::basic_syncbuf`へのポインタを返す  | C++20 |


## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `char_type` | `charT` | C++20 |
| `traits_type` | `Traits` `Traits::char_type`が`CharT`でない場合、プログラムは不適格である | C++20 |
| `int_type` | `Traits::int_type` | C++20 |
| `pos_type` | `Traits::pos_type` | C++20 |
| `off_type` | `Traits::off_type` | C++20 |
| `allocator_type` | `Allocator` | C++20 |
| `streambuf_type` | [`std::basic_streambuf<CharT, Traits>`](../streambuf/basic_streambuf.md) | C++20 |
| `syncbuf_type` | [`std::basic_syncbuf<CharT, Traits, Allocator>`](basic_syncbuf.md) | C++20 |


## 例
```cpp example
#include <iostream>
#include <syncstream>
#include <thread>

void thread1()
{
  {
    std::osyncstream bout{std::cout};
    bout << "Hello, ";
    bout << "World!";
    bout << std::endl; // フラッシュがノートされる
    bout << "and more!\n";
  }   // 文字が転送され、cout はフラッシュする
}

void thread2()
{
  // 同じバッファに行われる出力は、異なる std::basic_osyncstream(std::basic_syncbuf) の
  // インスタンスからでも、アトミックに出力されることが保証される
  std::osyncstream(std::cout) << "Goodbye, " << "Planet!" << '\n';
}

int main()
{
  std::thread th1(thread1);
  std::thread th2(thread2);
  th1.join();
  th2.join();
}
```
* osyncstream[color ff0000]

### 出力例

thread1 の処理が先行した場合。ただし、各出力は連続したシーケンスとなるように、アトミックに行われることが保証される。

```
Hello, World!
and more!
Goodbye, Planet!
```

## 間違った使用の例

`std::basic_osyncstream`のオブジェクトはストリーム出力をアトミックにしたいスレッド毎に持つ必要がある。1つの`std::basic_osyncstream`のオブジェクトを複数のスレッドで共有して使用してしまうと、出力は競合する。

```cpp example
#include <iostream>
#include <syncstream>
#include <thread>

// 1つのosyncstreamを複数スレッドで共有してしまうと出力の競合が起こる
std::osyncstream bout{std::cout};

void thread1()
{
  {
    bout << "Hello, ";
    bout << "World!";
    bout << std::endl;
    bout << "and more!\n";
  }
}

void thread2()
{
  bout << "Goodbye, " << "Planet!" << '\n';
}

int main()
{
  std::thread th1(thread1);
  std::thread th2(thread2);
  th1.join();
  th2.join();
}
```
* osyncstream[color ff0000]

### 出力例

```
Hello, World!
aGoodbye, Planet!
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 関連項目
- [`basic_ostream`](../ostream/basic_ostream.md)
- [`basic_syncbuf`](basic_syncbuf.md)

## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
