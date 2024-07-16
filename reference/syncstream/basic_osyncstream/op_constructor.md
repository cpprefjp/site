# コンストラクタ
* syncstream[meta header]
* function[meta id-type]
* std[meta namespace]
* basic_osyncstream[meta class]
* cpp20[meta cpp]

```cpp
basic_osyncstream(streambuf_type* buf, const Allocator& allocator);              // (1)

explicit basic_osyncstream(streambuf_type* obuf)
  : basic_osyncstream(obuf, Allocator()) {}                                      // (2)

basic_osyncstream(basic_ostream<charT, traits>& os, const Allocator& allocator)
  : basic_osyncstream(os.rdbuf(), allocator) {}                                  // (3)

explicit basic_osyncstream(basic_ostream<charT, traits>& os)
  : basic_osyncstream(os, Allocator()) {}                                        // (4)

basic_osyncstream(basic_osyncstream&& other) noexcept;                           // (5)
```

## 概要
- (1)〜(4) : ラップするストリーム、アロケータ（もしあれば）を受け取るコンストラクタ。
- (5) : ムーブコンストラクタ。


## 効果
- (1) : 提供されるストリームバッファ（`buf`）、アロケータ（`allocator`）を使用してプライベートメンバの[`std::basic_syncbuf`](../basic_syncbuf.md)を初期化し、そのポインタを用いて基底クラスである[`std::basic_ostream`](../../ostream/basic_ostream.md)を初期化する。
- (2)(3) : (1)に委譲。
- (4) : (3)に委譲。
- (5) : 対応する`other`のサブオブジェクトから基底クラスとプライベートメンバの`std::basic_syncbuf`をムーブ構築し、基底クラスの初期化を完了するために`std::basic_ostream<charT, traits>::set_rdbuf(addressof(sb))`を呼び出す。


## 事後条件
- (1)〜(4) : `get_wrapped() == buf`が`true`である。
- (5) : `get_wrapped()`によって返される値は、このコンストラクタを呼び出す前に`os.get_wrapped()`によって返される値である。また、`nullptr == other.get_wrapped()`が`true`である。


## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout};
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
- [LWG Issue 3130. §[input.output] needs many `addressof`](https://wg21.cmeerw.net/lwg/issue3130)
