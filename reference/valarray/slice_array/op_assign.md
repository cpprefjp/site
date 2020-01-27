# operator=
* valarray[meta header]
* std[meta namespace]
* slice_array[meta class]
* function[meta id-type]

```cpp
private:
  slice_array& operator=(const slice_array&);                // (1) C++03 まで（宣言のみ）

public:
  const slice_array& operator=(const slice_array& ar) const; // (1) C++11 から
  void operator=(const ValOrProxy<T>& ar) const;             // (2)
  void operator=(const T& value) const;                      // (3)
```
* valarray[link /reference/valarray/valarray.md]
* ValOrProxy[italic]

## 概要
- (1) : 元となる [`valarray`](../valarray.md) オブジェクトから参照によって抽出した各要素に、`ar` が参照する各要素を代入する
- (2) : 元となる [`valarray`](../valarray.md) オブジェクトから参照によって抽出した各要素に、`ar` の各要素を代入する
- (3) : 元となる [`valarray`](../valarray.md) オブジェクトから参照によって抽出した各要素に、`value` を代入する


## 効果
概要通り


## 戻り値
- (1) : `*this`
- (2), (3) : なし


## 備考
- 引数の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。
- (1) : C++03まで、このオーバー�ードは使用できなかった。
-  [`valarray`](../valarray.md) から抽出した要素数と `ar` の要素数が異なる場合、その挙動は未定義。


## 例
```cpp example
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

  const std::size_t start = 1u;  // 開始位置
  const std::size_t length = 3u; // 要素数
  const std::size_t stride = 2u; // 何個置きに処理するか

  std::slice_array<int> result = va[std::slice(start, length, stride)];

  // (1)
  // result1が参照する各要素に、resultが参照する各要素を代入する
  std::valarray<int> va1 = {1, 2, 3, 4, 5, 6};
  std::slice_array<int> result1 = va1[std::slice(0, 3, 1)];
  result1 = result;
  print("assign slice_array", va1);

  // (2)
  // resultが参照する要素全てに、33を代入
  result = std::valarray<int>(33, length);
  print("assign valarray", va);

  // (3)
  // resultが参照する要素全てに、55を代入
  result = 55;
  print("assign value", va);
}
```
* std::valarray[link /reference/valarray/valarray.md]
* std::slice[link /reference/valarray/slice.md]

### 出力
```
assign slice_array : {2,4,6,4,5,6}
assign valarray : {1,33,3,33,5,33}
assign value : {1,55,3,55,5,55}
```


### 備考
- Clang 3.3 + libc++で、(1)の実装に`return`文がなかった([Bug 20614](https://llvm.org/bugs/show_bug.cgi?id=20614))


