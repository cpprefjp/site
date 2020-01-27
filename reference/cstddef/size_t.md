# size_t
* cstddef[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using size_t = implementation-defined;
}
```

## 概要
`size_t`は、オブジェクトのバイト数を表現できる程度に十分に大きい符号なし整数型である。
C++03まではC言語と同じく「`sizeof`演算�によって返される符号なし整数型」と規定されていた。

オブジェクトのバイト数（例えば[`malloc`](/reference/cstdlib.md)の引数）やコンテナの要素数（例えば[`std::size()`](/reference/iterator/size.md)の返り値）を表現するために用いられる。

## 例
```cpp example
#include <cstddef>
#include <cassert>

int main()
{
  std::size_t n = sizeof('a');
  assert(n == 1);
}
```
* std::size_t[color ff0000]


### 出力
```
```


## 参照
- [CWG Issue 1122. Circular definition of `std::size_t`](https://wg21.cmeerw.net/cwg/issue1122)
