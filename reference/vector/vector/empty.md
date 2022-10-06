# empty
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]

```cpp
bool empty() const;                                  // (1) C++03
bool empty() const noexcept;                         // (1) C++11
[[nodiscard]] constexpr bool empty() const noexcept; // (1) C++20
```

## 概要
コンテナが空かどうかを判定する


## 戻り値
コンテナが空であれば`true`、そうでなければ`false`を返す。


## 計算量
定数時間


## 例外
投げない


## 計算量
定数時間


## 備考
`a.empty()` と `a.begin() == a.end()` は同じ結果になる
。

## 例
```cpp example
#include <iostream>
#include <vector>

int main()
{
  // 空
  {
    std::vector<int> v;
    bool b = v.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
  // 空じゃない
  {
    std::vector<int> v = {1, 2, 3};
    bool b = v.empty();
    std::cout << std::boolalpha << b << std::endl;
  }
}
```
* empty()[color ff0000]

### 出力
```
true
false
```


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
- [P1004R2 Making `std::vector` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1004r2.pdf)
