# basic_syncbuf
* syncstream[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]
* syncbuf,wsyncbuf[meta alias]

```cpp
namespace std {
  template<class charT, class traits, class Allocator>
  class basic_syncbuf : public basic_streambuf<charT, traits> { ... };

  using syncbuf = basic_syncbuf<char>;
  using wsyncbuf = basic_syncbuf<wchar_t>;
}
```
* basic_streambuf[link ../streambuf/basic_streambuf.md]


## 概要
クラステンプレート`basic_syncbuf`は、書き込まれた文字データをオブジェクトのアロケータを使って割り当てられた内部バッファに格納する。
格納された文字データは、`emit()`が呼び出されたとき、または`basic_syncbuf`オブジェクトが破棄されたときに、ラップされたストリームバッファオブジェクトに転送される。
このような転送は、同じラップストリームバッファオブジェクトを持つ他の`basic_syncbuf`オブジェクトによる転送に関してアトミックである。

| エイリアス | 説明 | 対応バージョン |
|------------|------|----------------|
| `syncbuf`  | `basic_syncbuf<char>` | C++20 |
| `wsyncbuf` | `basic_syncbuf<wchar_t>` | C++20 |


## メンバ

基底クラスである [`basic_streambuf`](../streambuf/basic_streambuf.md) も参照のこと。

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`(constructor)`](basic_syncbuf/op_constructor.md) | コンストラクタ | C++20 |
| [`(destructor)`](basic_syncbuf/op_destructor.md)   | デストラクタ   | C++20 |

### 割り当てと交換

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`operator=`](basic_syncbuf/op_assign.md) | 代入演算子 | C++20 |
| [`swap`](basic_syncbuf/swap.md) | 他の`basic_syncbuf`オブジェクトと状態を交換する | C++20 |

### その他パブリックメンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`emit`](basic_syncbuf/emit.md) | ラップされたストリームバッファに出力をアトミックに転送する | C++20 |
| [`get_wrapped`](basic_syncbuf/get_wrapped.md) | ラップされた streambuf のポインタを取得する | C++20 |
| [`get_allocator`](basic_syncbuf/get_allocator.md) | アロケータを取得する | C++20 |
| [`set_emit_on_sync`](basic_syncbuf/set_emit_on_sync.md) | `sync()`が呼ばれたとき`emit()`を呼び出すかどうかを設定する | C++20 |

### プロテクテッドなオーバーライドされた仮想メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`sync`](basic_syncbuf/sync.md) | フラッシュが保留されていることを記録し、<br/>現在の同期時排出ポリシーに応じて`emit()`を呼び出す(デフォルトでは呼び出さない) | C++20 |

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

## 非メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| [`swap`](basic_syncbuf/swap_free.md) | 2つの`basic_syncbuf`オブジェクトを入れ替える | C++20 |


## 例
```cpp example
#include <iostream>
#include <syncstream>
#include <thread>

void thread1()
{
  {
    // std::basic_syncbuf は通常、直接でなく、
    // 対応するストリーム std::osyncstream を通してのみアクセスされる
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


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 関連項目
- [`basic_streambuf`](../streambuf/basic_streambuf.md)
- [`basic_osyncstream`](basic_osyncstream.md)


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
