# operator=
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray& operator=(const valarray<T>& x);       // (1)
valarray& operator=(valarray<T>&& x) noexcept;   // (2) C++11
valarray& operator=(initializer_list<T> init);   // (3) C++11
valarray& operator=(const T& value);             // (4)
valarray& operator=(const slice_array<T>& x);    // (5)
valarray& operator=(const gslice_array<T>& x);   // (6)
valarray& operator=(const mask_array<T>& x);     // (7)
valarray& operator=(const indirect_array<T>& x); // (8)
```
* initializer_list[link /reference/initializer_list.md]
* slice_array[link /reference/valarray/slice_array.md]
* gslice_array[link /reference/valarray/gslice_array.md]
* mask_array[link /reference/valarray/mask_array.md]
* indirect_array[link /reference/valarray/indirect_array.md]

## 概要
- (1) : コピー代入
- (2) : ムーブ代入
- (3) : 初期化子リストの代入
- (4) : 全ての要素に`value`を代入する
- (5) : [`slice_array`](/reference/valarray/slice_array.md)オブジェクトから`valarray`への変換を行う。
- (6) : [`gslice_array`](/reference/valarray/gslice_array.md)オブジェクトから`valarray`への変換を行う。
- (7) : [`mask_array`](/reference/valarray/mask_array.md)オブジェクトから`valarray`への変換を行う。
- (8) : [`indirect_array`](/reference/valarray/indirect_array.md)オブジェクトから`valarray`への変換を行う。



## 効果
- (1) : `*this`と`x`が異なる要素数の場合、`resize(x.size())`を呼び出す。`*this`の各要素に、`x`の各要素を代入する。
- (2) : `*this`に`x`の所有権を譲渡する。ムーブ後の`x`の状態は未規定。
- (3) : `*this = valarray(init)`と等価。
- (4) : `*this`の全ての要素に値`value`を代入する。
- (5), (6), (7), (8) : `x`が参照している要素を、`*this`に代入する。


## 計算量
- (2) : 全要素のデストラクタを呼び出すために、線形時間


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
  // (1)
  // コピー代入
  std::valarray<int> va1_org = {1, 2, 3};
  std::valarray<int> va1 = va1_org;
  print("va1", va1);

  // (2)
  // ムーブ代入
  std::valarray<int> va2 = std::move(va1);
  print("va2", va2);

  // (3)
  // 初期化子リストを代入
  std::valarray<int> va3;
  va3 = {1, 2, 3};
  print("va3", va3);

  // (4)
  // 値を全要素に代入
  std::valarray<int> va4(3);
  va4 = 1;
  print("va4", va4);

  // (5)
  // スライスされたvalarrayオブジェクトを代入
  std::valarray<int> va5_org = {1, 2, 3, 4, 5};
  std::valarray<int> va5 = va5_org[std::slice(0, 3, 1)]; // 先頭3要素
  print("va5", va5);

  // (6)
  // 行列スライスされたvalarrayオブジェクトを代入
  std::valarray<int> va6_org = {1, 2, 3, 4, 5};
  std::valarray<std::size_t> va6_len = {1, 2, 2};
  std::valarray<std::size_t> va6_stride = {2, 3, 1};
  std::valarray<int> va6 = va6_org[std::gslice(0, va6_len, va6_stride)];
  print("va6", va6);

  // (7)
  // マスクされたvalarrayオブジェクトを代入
  std::valarray<int> va7_org = {1, 2, 3, 4, 5};
  std::valarray<bool> va7_mask = {true, false, true, false, true};
  std::valarray<int> va7 = va7_org[va7_mask];
  print("va7", va7);

  // (8)
  // インデックス列の指定によってマスクされたvalarrayオブジェクトを代入
  std::valarray<int> va8_org = {1, 2, 3, 4, 5};
  std::valarray<std::size_t> va8_indices = {0, 2, 4};
  std::valarray<int> va8 = va8_org[va8_indices];
  print("va8", va8);
}
```
* std::move[link /reference/utility/move.md]
* std::slice[link /reference/valarray/slice.md]
* std::gslice[link /reference/valarray/gslice.md]

### 出力
```
va1 : {1,2,3}
va2 : {1,2,3}
va3 : {1,2,3}
va4 : {1,1,1}
va5 : {1,2,3}
va6 : {1,2,4,5}
va7 : {1,3,5}
va8 : {1,3,5}
```

## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書
- [LWG Issue 2071. `std::valarray` move-assignment](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2071)
    - C++11でムーブ代入の計算量を「定数時間」であると記載していたが、実際には全要素のデストラクタを呼び出すために「線形時間」が正しかった。C++14で文面を修正。


