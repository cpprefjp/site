#nothrow_t
```cpp
namespace std {
  struct nothrow_t {};
  extern const nothrow_t nothrow;
}
```

##概要
`nothrow_t`は、`new`失敗時に例外を送出させないための型である。
`nothrow`は、`std::nothrow_t`型の定数であり、`new`キーワードに指定するタグとして使用する。


```cpp
#include <iostream>
#include <new>

int main()
{
  // 長さ3の動的配列を作成する
  // 領域確保に失敗した場合、nullptrが返される
  int* p = new(std::nothrow) int[3];
}
```
* std::nothrow[color ff0000]

