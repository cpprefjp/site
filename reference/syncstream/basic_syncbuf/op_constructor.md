# コンストラクタ
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_syncbuf[meta class]
* cpp20[meta cpp]


```cpp
explicit basic_syncbuf(streambuf_type* obuf = nullptr) 
  : basic_syncbuf(obuf, Allocator()) { }                          // (1)
basic_syncbuf(streambuf_type* obuf, const Allocator& allocator);  // (2)
basic_syncbuf(basic_syncbuf&& other);                             // (3)
```

## 概要
- (1) : デフォルトコンストラクタ。ラップする[`std::basic_streambuf`](../../streambuf/basic_streambuf.md)へのポインタを受け取る。
- (2) : ラップする`std::basic_streambuf`へのポインタ、アロケータを受け取る。
- (3) : ムーブコンストラクタ。

ただし、これらは通常[`std::basic_osyncstream`](../basic_osyncstream.md)から呼ばれる。


## 効果
- (1), (2) : 同期時排出ポリシー([`sync()`](sync.md)が呼ばれたとき[`emit()`](emit.md)を呼び出すかどうか)を`false`に設定し、`std::basic_syncbuf`オブジェクトを作成し、ラップされたストリームバッファを`obuf`に設定する。`obuf`が、関連する出力の最終的な宛先になる。
- (3) : 他のオブジェクトからムーブコンストラクトする。


## 例外
- (1), (2) : ミューテックスの構築から[`std::system_error`](../../system_error/system_error.md)、またはメモリ割り当てによって[`std::bad_alloc`](../../new/bad_alloc.md)例外がスローされる可能性がある。


## 事後条件
- (1), (2) : `get_wrapped() == obuf`と`get_allocator() == allocator`が`true`となる。
- (3) : `this->get_wrapped()`によって返される値は、このコンストラクタを呼び出す前に`other.get_wrapped()`によって返される値である。
このコンストラクタを呼び出す前に`other`に格納された出力は、`*this`に格納される。
`other.rdbuf()->pbase() == other.rdbuf()->pptr()`と`other.get_wrapped() == nullptr`は`true`である。


## 備考
- (1), (2) : アロケータのコピーは、関連する出力を保持する内部バッファにメモリを割り当てるために使用される。
- (3) : このコンストラクタは、`other`をそのラップされたストリームバッファから切り離し、`other`の破棄によって出力がされないようにする。


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout}; // 通常 std::basic_osyncstream から呼ばれる。
  bout << "Hello, World!";
}
```

### 出力
```
Hello, World!
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 update 10 [mark verified]


## 参照
- [P0053R7 C++ Synchronized Buffered Ostream](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0053r7.pdf)
