# flush_emit
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class charT, class traits>
  basic_ostream<charT, traits>& flush_emit(basic_ostream<charT, traits>& os);
}
```

## 概要
このマニピュレータは、実際には[`std::basic_osyncstream`](../syncstream/basic_osyncstream.md)に対して使用されることが期待される。それ以外の場合、このマニピュレータは[`std::flush`](flush.md)と�価である。

このマニピュレータは、`std::basic_osyncstream`のオブジェクトに`flush`を記録し、文�を転送する。ここで、通常`flush`をしただけでは文�は転送されないようになっていることに注意。この�定(同期時排出ポリシー)を変更するために、[`emit_on_flush`](emit_on_flush.md)、[`noemit_on_flush`](noemit_on_flush.md)といったマニピュレータが用意されている。


## 効果
`os.flush()`を呼び出す。  
`os.rdbuf()`が`std::basic_syncbuf<charT、traits、Allocator>*`である場合、これを`buf`とすると、`buf->emit()`を呼び出す。  
それ以外の場合、このマニピュレータは効果がない。


## 戻り値
`os`

## 備考
本関数は、直接呼ぶのではなく、マニピュレータ関数へのポインタを引数に取る出力演算�（[`operator<<`](basic_ostream/op_ostream.md)、挿入演算�、インサータとも呼ばれる）を通じて呼び出されるのが一般的である。

## 例
```cpp example
#include <iostream>
#include <syncstream>

int main()
{
  std::osyncstream bout{std::cout};
  bout << "Hello, World!";

  bout << std::flush_emit; // 通常はここで保留�の文�は転送されないが、
                           // ここで文�が転送される。
                           // なお、同期時排出ポリシーは false のままである。
}
```
* flush_emit[color ff0000]

### 出力
```
Hello, World!
```

## バージョン
### 言語
- C++20

## 参照
- [`emit_on_flush`](emit_on_flush.md)
- [`noemit_on_flush`](noemit_on_flush.md)
- [`std::basic_osyncstream`](../syncstream/basic_osyncstream.md)
- [`std::basic_syncbuf`](../syncstream/basic_syncbuf.md)
