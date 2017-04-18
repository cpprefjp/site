# operator=
* valarray[meta header]
* std[meta namespace]
* indirect_array[meta class]
* function[meta id-type]

```cpp
private:
  indirect_array& operator=(const indirect_array&); // (1) C++03 宣言のみ

public:
  const indirect_array& operator=(const indirect_array& ar) const; // (1) C++11
  void operator=(const valarray<T>& ar) const;                     // (2)
  void operator=(const T& value) const;                            // (3)
```
* std::valarray[link /reference/valarray/valarray.md]

## 概要
- (1) : 元となる`valarray`オブジェクトから参照によって抽出した各要素に、`ar`が参照する各要素を代入する
- (2) : 元となる`valarray`オブジェクトから参照によって抽出した各要素に、`ar`の各要素を代入する
- (3) : 元となる`valarray`オブジェクトから参照によって抽出した各要素に、`value`を代入する


## 効果
概要通り


## 戻り値
- (1) : `*this`
- (2), (3) : なし


## 備考
- (1) : C++03まで、このオーバーロードは使用できなかった。
- (2) : `valarray`から抽出した要素数と`ar`の要素数が異なる場合、その挙動は未定義。


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
  std::valarray<int> va = {1, 2, 3, 4, 5, 6};
  std::valarray<std::size_t> mask = {1, 3, 5};

  std::indirect_array<int> result = va[mask];

  // (1)
  // result1が参照する各要素に、resultが参照する各要素を代入する
  std::valarray<int> va1 = {1, 2, 3, 4, 5, 6};
  std::valarray<std::size_t> mask1 = {0, 1, 2};
  std::indirect_array<int> result1 = va1[mask1];
  result1 = result;
  print("assign indirect_array", va1);

  // (2)
  // resultが参照する要素全てに、33を代入
  result = std::valarray<int>(33, mask.size());
  print("assign valarray", va);

  // (3)
  // resultが参照する要素全てに、55を代入
  result = 55;
  print("assign value", va);
}
```
* std::valarray[link /reference/valarray/valarray.md]
* mask.size()[link /reference/valarray/size.md]

### 出力
```
assign indirect_array : {2,4,6,4,5,6}
assign valarray : {1,33,3,33,5,33}
assign value : {1,55,3,55,5,55}
```


