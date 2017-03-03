#size_t
* cstddef[meta header]
* std[meta namespace]
* typedef[meta id-type]

```cpp
namespace std {
  using size_t = implementation-defined;
}
```

`size_t`は、`sizeof`演算子によって返される符号なし整数型である。

この型はそのほかに、コンテナの要素数やインデックス値を表すために使用される。


##例
```cpp
#include <cstddef>
#include <cassert>

int main()
{
  std::size_t n = sizeof('a');
  assert(n == 1);
}
```
* std::size_t[color ff0000]


###出力
```
```

