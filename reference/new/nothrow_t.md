# nothrow_t
* new[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  struct nothrow_t {};
  extern const nothrow_t nothrow;
}
```

## 概要
`nothrow_t`は、`new`失敗時に例外を送出させないための型である。

`nothrow`は、`std::nothrow_t`型の定数であり、`new`�ーワードに指定するタグとして使用する。


```cpp example
#include <iostream>
#include <new>

struct ThrowObj
{
  ThrowObj()
  {
    throw std::logic_error("logic_error: ThrowObj::ThrowObj()");
  }
};

int main()
{
  // 長さ3の動的配列を作成する
  // 領域確保に失敗した場合、nullptrが返される
  int* p = new(std::nothrow) int[3];

  // ただし、オブジェクトのコンストラクタが例外を投げる場合は
  // 例外がス�ーされることに注意
  try
  {
    ThrowObj* obj = new(std::nothrow) ThrowObj();
    delete obj;
  }
  catch (std::logic_error& e)
  {
    // この場合でもnew(std::nothrow)で確保されたメモリは解放されている。
    std::cout << e.what() << std::endl;
  }
}
```
* std::nothrow[color ff0000]
* std::logic_error[link /reference/stdexcept.md]

### 出力
```
logic_error: ThrowObj::ThrowObj()
```
