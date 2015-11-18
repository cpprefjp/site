#bad_alloc
* new[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class bad_alloc : public exception {
  public:
    bad_alloc() noexcept;
    bad_alloc(const bad_alloc&) noexcept;
    bad_alloc& operator=(const bad_alloc&) noexcept;
    virtual const char* what() const noexcept;
  };
}
```

##概要
何らかの理由で記憶域の動的確保に失敗するなど、[`get_new_handler`](get_new_handler.md)`()`が`nullptr`を返した場合に投げられる例外。


```cpp
#include <iostream>
#include <new>

struct X {};

int main()
{
  try {
    X* x = new X();
  }
  catch (std::bad_alloc& e) {
    // メモリ確保に失敗
    std::cout << e.what() << std::endl;
  }
}
```

