# cshift
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray<T> cshift(int n) const;
```

## 概要
要素の位置を循環シフトする。

「cshift」は「circular shift(循環シフト)」の略。


## 戻り値
- `n`が正の値である場合、`n`個分だけ要素を前(`0`番目に向かう方向)に移動する。
	- 移動したことによって範囲外となった要素は、配列の後ろに移動する。
- `n`が負の値である場合、`n`個分だけ要素を後ろ(`size()`に向かう方向)に移動する。
	- 移動したことによって範囲外となった要素は、配列の先頭に移動する。


## 例
```cpp
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& va)
{
  std::cout << name << " : {";
  bool first = true;

  for (const T& x : va) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << "}" << std::endl;
}

int main()
{
  const std::valarray<int> va = {1, 2, 3, 4, 5};

  const std::valarray<int> left_shift_result = va.cshift(3);
  print("left_shift_result", left_shift_result);

  const std::valarray<int> right_shift_result = va.cshift(-3);
  print("right_shift_result", right_shift_result);
}
```
* cshift[color ff0000]

### 出力
```
left_shift_result : {4,5,1,2,3}
right_shift_result : {3,4,5,1,2}
```


## 参照
- [LWG Issue 618. `valarray::cshift()` effects on empty array](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#618)
    - 空の配列に対するこの関数の挙動が、C++11で明確になった

