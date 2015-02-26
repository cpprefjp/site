#destroy
* memory[meta header]
* std[meta namespace]

```cpp
// C++03
void destroy(pointer p);

// C++11
template <class U>
void destroy(U* p);
```

##概要
インスタンスを破棄する。


##効果
- C++03 : `((T*)p)->˜T()`
- C++11 : `p->˜U()`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <memory>
#include <utility>

int main()
{
  typedef std::pair<int, char> value_type;
  std::allocator<value_type> alloc;

  std::size_t n = 1;
  value_type* p = alloc.allocate(n);

  // メモリ領域にpairオブジェクトを構築
  alloc.construct(p, 3, 'a');

  std::cout << p->first << ", " << p->second << std::endl;

  // pairオブジェクトを破棄
  alloc.destroy(p);

  alloc.deallocate(p, n);
}
```

###出力
```
3, a
```


