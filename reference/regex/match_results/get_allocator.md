# get_allocator
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
allocator_type get_allocator() const;
```

## 概要
ア�ケータオブジェクトのコピーを取得する。


## 戻り値
`*this` で使用しているア�ケータオブジェクトのコピー


## 備考
`*this` で使用しているア�ケータオブジェクトは、構築時に�定されたものか、直近の代入時、あるいは、交換時に�定されたもののいずれかである。


## 例
```cpp example
#include <iostream>
#include <memory>
#include <regex>
#include <type_traits>

template <class T>
struct my_alloc {
  using value_type = T;
  T* allocate(std::size_t n) { return static_cast<T*>(::operator new(sizeof(T) * n)); }
  void deallocate(T* p, std::size_t) noexcept { ::operator delete(static_cast<void*>(p)); }
  template <class U>
  my_alloc(const my_alloc<U>& b) noexcept : no(b.no) { }
  explicit my_alloc(const int _no = 0) : no(_no) { }
  int no;
  using propagate_on_container_swap = std::true_type;
  //using propagate_on_container_copy_assignment = std::true_type;
  using propagate_on_container_move_assignment = std::true_type;
  my_alloc select_on_container_copy_construction() const { return my_alloc(no + 1); }
};

template <class T1, class T2>
bool operator==(const my_alloc<T1>& a1, const my_alloc<T2>& a2) noexcept
{
  return a1.no == a2.no;
}

template <class T1, class T2>
bool operator!=(const my_alloc<T1>& a1, const my_alloc<T2>& a2) noexcept
{
  return a1.no != a2.no;
}

template <class BidiIter>
using mymatch = std::match_results<BidiIter, my_alloc<std::sub_match<BidiIter>>>;

int main()
{
  mymatch<char*> mm1(my_alloc<std::sub_match<char*>>(1));

  // my_alloc は select_on_container_copy_construction を定義しているので、
  // コピーコンストラクタではそれを用いてア�ケータを取得する。
  mymatch<char*> mm2(mm1);
  std::cout << mm1.get_allocator().no << ',' << mm2.get_allocator().no << std::endl;

  // my_alloc は propagate_on_container_swap を true_type としているので、
  // ア�ケータも swap される。
  swap(mm1, mm2);
  std::cout << mm1.get_allocator().no << ',' << mm2.get_allocator().no << std::endl;

  // my_alloc は propagate_on_container_copy_assignment を true_type としていないので、
  // ア�ケータは copy されない。
  mm1 = mm2;
  std::cout << mm1.get_allocator().no << ',' << mm2.get_allocator().no << std::endl;

  // my_alloc は propagate_on_container_move_assignment を true_type としているので、
  // ア�ケータも move される。
  mm1 = std::move(mm2);
  std::cout << mm1.get_allocator().no << std::endl;

  // move コンストラクタでは、ア�ケータも無条件に move される。
  mymatch<char*> mm3(std::move(mm1));
  std::cout << mm3.get_allocator().no << std::endl;
}
```
* get_allocator()[color ff0000]
* operator new[link ../../new/op_new.md]
* operator delete[link ../../new/op_delete.md]
* swap[link swap_free.md]
* std::match_results[link ../match_results.md]
* std::sub_match[link ../sub_match.md]
* std::move[link /reference/utility/move.md]

### 出力
```
1,2
2,1
2,1
1
1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
`get_allocator` の問題ではないが、GCC(libstdc++) の 4.9.2 までは代入演算�を使用した場合に�しくア�ケータを�定しない。
