# operator=
* valarray[meta header]
* std[meta namespace]
* gslice_array[meta class]
* function[meta id-type]

```cpp
private:
  gslice_array& operator=(const gslice_array&); // (1) C++03 宣言のみ

public:
  const gslice_array& operator=(const gslice_array& ar) const; // (1) C++11
  void operator=(const valarray<T>& ar) const;                 // (2)
  void operator=(const T& value) const;                        // (3)
```

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
#include <numeric> // accumulate
#include <functional> // multiplies

std::size_t product(const std::valarray<std::size_t>& va)
{
  return std::accumulate(
           std::begin(va),
           std::end(va),
           1u,
           std::multiplies<std::size_t>());
}

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

  const std::size_t start = 1u;  // 開始位置
  const std::valarray<std::size_t> lengths = {3u}; // 要素数
  const std::valarray<std::size_t> strides = {2u}; // 何個置きに処理するか

  // (1)
  // 左辺のgslice_arrayが参照する各要素に、右辺のgslice_arrayが参照する各要素を代入する
  std::valarray<int> va1 = {1, 2, 3, 4, 5, 6};
  va1[std::gslice(
        0,
        std::valarray<std::size_t>(3u, 1),
        std::valarray<std::size_t>(1u, 1))] = va[std::gslice(start, lengths, strides)];
  print("assign gslice_array", va1);

  // (2)
  // 抽出した要素全てに33を代入する
  va[std::gslice(start, lengths, strides)] = std::valarray<int>(33, product(lengths));
  print("assign valarray", va);

  // (3)
  // 抽出した要素全てに55を代入する
  va[std::gslice(start, lengths, strides)] = 55;
  print("assign value", va);
}
```

### 出力
```
assign gslice_array : {2,4,6,4,5,6}
assign valarray : {1,33,3,33,5,33}
assign value : {1,55,3,55,5,55}
```


