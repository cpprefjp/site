#construct
* memory[meta header]
* std[meta namespace]

```cpp
// C++03
void construct(pointer p, const T& val);

// C++11
template <class U, class... Args>
void construct(U* p, Args&&... args);
```

##概要
引数を元にインスタンスを構築する。


##効果
- C++03 : `new((void *)p) T(val)`
- C++11 : `::new((void *)p) U(`[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`


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

  alloc.destroy(p);
  alloc.deallocate(p, n);
}
```

###出力
```
3, a
```


###C++11版の処理系対応状況
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


