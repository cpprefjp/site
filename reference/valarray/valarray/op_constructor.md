# コンストラクタ
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* function[meta id-type]

```cpp
valarray();                           // (1)
explicit valarray(size_t n);          // (2)
valarray(const T& value, size_t n);   // (3)
valarray(const T* first, size_t n);   // (4)
valarray(const ValOrProxy<T>& x);     // (5)
valarray(valarray&& x) noexcept;      // (6) C++11 から
valarray(const slice_array<T>& x);    // (7)
valarray(const gslice_array<T>& x);   // (8)
valarray(const mask_array<T>& x);     // (9)
valarray(const indirect_array<T>& x); // (10)
valarray(initializer_list<T> init);   // (11) C++11 から
```
* ValOrProxy[italic]
* slice_array[link /reference/valarray/slice_array.md]
* gslice_array[link /reference/valarray/gslice_array.md]
* mask_array[link /reference/valarray/mask_array.md]
* indirect_array[link /reference/valarray/indirect_array.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]

## `valarray`オブジェクトの構築
- (1) : デフォルトコンストラクタ
- (2) : `n`個の`T()`初期化された要素を保持した`valarray`オブジェクトを構築する。
- (3) : `value`のコピーを`n`個要素として保持した`valarray`オブジェクトを構築する。
- (4) : `[first, first + n)`の範囲を要素としてコピーした`valarray`オブジェクトを構築する。
- (5) : コピーコンストラクタ
- (6) : ムーブコンストラクタ
- (7) : [`slice_array`](/reference/valarray/slice_array.md)オブジェクトから`valarray`への変換を行う。
- (8) : [`gslice_array`](/reference/valarray/gslice_array.md)オブジェクトから`valarray`への変換を行う。
- (9) : [`mask_array`](/reference/valarray/mask_array.md)オブジェクトから`valarray`への変換を行う。
- (10) : [`indirect_array`](/reference/valarray/indirect_array.md)オブジェクトから`valarray`への変換を行う。
- (11) : 初期化�リストを受け取るコンストラクタ


## 効果
- (1) : `size() == 0`の要素を持たない空の`valarray`オブジェクトを構築する。
- (2) : `n`個の`T()`初期化された要素を保持した`valarray`オブジェクトを構築する。
- (3) : `value`のコピーを`n`個要素として保持した`valarray`オブジェクトを構築する。
- (4) : ポインタ`first`が指す要素から`n`個先までをコピーして、`valarray`オブジェクトを構築する。`n`が`first`の要素数より大きい場合、その挙動は未定義。
- (5) : `x`と同じ要素を保持した`valarray`オブジェクトを構築する。
- (6) : `x`と同じ要素を保持した`valarray`オブジェクトを構築する。ムーブ後の`x`の状態は未規定。
- (7), (8), (9), (10) : `x`が参照している要素から、`valarray`オブジェクトを構築する。
- (11) : `valarray(init.begin(), init.size())`と�価。


## 計算量
- (6) : 定数時間


## 備考
- 引数の型 *`ValOrProxy`* は、[`valarray`](../valarray.md)、あるいは、その代理となる型である。  
	[`<valarray>`](../../valarray.md) の概要も参照のこと。


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
  // デフォルト構築
  std::valarray<int> va1;
  print("va1", va1);

  // (2)
  // 3個の要素を保持するvalarrayオブジェクトを構築。
  // 要素は0(T())で埋められる。
  std::valarray<int> va2(3);
  print("va2", va2);

  // (3)
  // 値1を持つ要素3個からなるvalarrayオブジェクトを構築。
  std::valarray<int> va3(1, 3);
  print("va3", va3);

  // (4)
  // 配列の先�3要素のコピーからvalarrayオブジェクトを構築。
  int ar4[] = {1, 2, 3, 4};
  std::valarray<int> va4(ar4, 3);
  print("va4", va4);

  // (5)
  // コピー構築。
  std::valarray<int> va5 = va4;
  print("va5", va5);

  // (6)
  // ムーブ構築。
  std::valarray<int> va6 = std::move(va5);
  print("va6", va6);

  // (7)
  // スライスされたvalarrayオブジェクトから構築
  std::valarray<int> va7_org = {1, 2, 3, 4, 5};
  std::valarray<int> va7(va7_org[std::slice(0, 3, 1)]); // 先�3要素
  print("va7", va7);

  // (8)
  // 行列スライスされたvalarrayオブジェクトから構築
  std::valarray<int> va8_org = {1, 2, 3, 4, 5};
  std::valarray<std::size_t> va8_len = {1, 2, 2};
  std::valarray<std::size_t> va8_stride = {2, 3, 1};
  std::valarray<int> va8 = va8_org[std::gslice(0, va8_len, va8_stride)];
  print("va8", va8);

  // (9)
  // マスクされたvalarrayオブジェクトから構築
  std::valarray<int> va9_org = {1, 2, 3, 4, 5};
  std::valarray<bool> va9_mask = {true, false, true, false, true};
  std::valarray<int> va9 = va9_org[va9_mask];
  print("va9", va9);

  // (10)
  // インデックス列の指定によってマスクされたvalarrayオブジェクトから構築
  std::valarray<int> va10_org = {1, 2, 3, 4, 5};
  std::valarray<std::size_t> va10_indices = {0, 2, 4};
  std::valarray<int> va10 = va10_org[va10_indices];
  print("va10", va10);

  // (11)
  // 初期化�リストから構築
  std::valarray<int> va11 = {1, 2, 3};
  print("va11", va11);
}
```
* std::move[link /reference/utility/move.md]
* std::slice[link /reference/valarray/slice.md]
* std::gslice[link /reference/valarray/gslice.md]

### 出力
```
va1 : {}
va2 : {0,0,0}
va3 : {1,1,1}
va4 : {1,2,3}
va5 : {1,2,3}
va6 : {1,2,3}
va7 : {1,2,3}
va8 : {1,2,4,5}
va9 : {1,3,5}
va10 : {1,3,5}
va11 : {1,2,3}
```


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (11)の経緯となる提案文書

