# operator->
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
pointer operator->() const;           // C++03
constexpr pointer operator->() const; // C++17
constexpr pointer operator->() const  // C++20
  requires (is_pointer_v<Iterator> ||
            requires (const Iterator i) { i.operator->(); });
```
* is_pointer_v[link /reference/type_traits/is_pointer.md]

## 概要
イテレータを通してオブジェクトにアクセスする


## 戻り値
- C++03 : `&(operator*())`
- C++14 : [`addressof`](/reference/memory/addressof.md)`(operator*())`
- C++20 : 次のいずれか
    - `Iterator`がポインタ型である場合
      ```cpp
      return prev(current);
      ```
      * prev[link /reference/iterator/prev.md]

    - それ以外の場合
      ```cpp
      return prev(current).operator->();
      ```
      * prev[link /reference/iterator/prev.md]

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

class value {
  int x;

public:
  value(int x = 0) : x(x) {}
  int get() const { return x; }
};

int main()
{
  std::vector<value> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  int result = it->get();

  std::cout << result << std::endl;
}
```
* it->[color ff0000]

### 出力
```
3
```

## 参照
- [LWG Issue 2188. Reverse iterator does not fully support targets that overload `operator&`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2188)
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
