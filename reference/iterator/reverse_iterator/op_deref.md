# operator*
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reference operator*() const;           // C++03
constexpr reference operator*() const; // C++17
```

## 概要
イテレータを間接参照する。


## 効果
- C++11

```cpp
deref_tmp = current;
--deref_tmp;
return *deref_tmp;
```

※`deref_tmp`は、ぶら下がり参照を避けるために関数内の�ーカル変数ではなく、メンバ変数として保持される。


- C++14

```cpp
Iterator tmp = current;
return *--tmp;
```


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it(v.end());

  int& result = *it;

  std::cout << result << std::endl;
}
```
* *it[color ff0000]

### 出力
```
3
```

## 参照
- [LWG Issue 2360. `reverse_iterator::operator*()` is unimplementable](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2360)
    - C++11まで効果は、データ競合が発生するため、C++14でそれを考慮して効果を見直した。
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
