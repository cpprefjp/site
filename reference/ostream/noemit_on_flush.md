# noemit_on_flush
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class charT, class traits>
  basic_ostream<charT, traits>& noemit_on_flush(basic_ostream<charT, traits>& os);
}
```

## 概要
このマニピュレータは、実際には[`std::basic_osyncstream`](../syncstream/basic_osyncstream.md)に対して使用されることが期待される。`std::basic_osyncstream`のベースとなる[`std::basic_syncbuf`](../syncstream/basic_syncbuf.md)の同期時排出ポリシーを`false`に変更する。つまり、`std::basic_osyncstream`のオブジェクトに`flush()`が呼ばれた際、文字が転送されないようになる。デフォルトでは、文字は転送されないようになっているため、このマニピュレータを明示的に使用する必要はない。  
また、対になるマニピュレータとして、[`emit_on_flush`](emit_on_flush.md)が存在する。


## 効果
`os.rdbuf()`が`std::basic_syncbuf<charT, traits, Allocator>*`である場合、これを`buf`とすると、`buf->set_emit_on_sync(false)`を呼び出す。  
それ以外の場合、このマニピュレータは効果がない。


## 戻り値
`os`

## 備考
本関数は、直接呼ぶのではなく、マニピュレータ関数へのポインタを引数に取る出力演算子（[`operator<<`](basic_ostream/op_ostream.md)、挿入演算子、インサータとも呼ばれる）を通じて呼び出されるのが一般的である。

## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!\n";

  bout << std::emit_on_flush;

  bout << std::flush; // 通常はここで保留中の文字は転送されないが、
                      // emit_on_flush を呼び出し、同期時排出ポリシーが true となっているため、
                      // ここで文字が転送される
  
  bout << "Goodbye, Planet!";
  bout << std::noemit_on_flush;

  bout << std::flush; // ここでは、文字は転送されない
} // bout 破棄時に bout.emit() が呼ばれ、ここで文字が転送される
```
* noemit_on_flush[color ff0000]

### 出力
```
Hello, World!
Goodbye, Planet!
```

## バージョン
### 言語
- C++20

## 参照
- [`emit_on_flush`](emit_on_flush.md)
- [`flush_emit`](flush_emit.md)
- [`std::basic_osyncstream`](../syncstream/basic_osyncstream.md)
- [`std::basic_syncbuf`](../syncstream/basic_syncbuf.md)
