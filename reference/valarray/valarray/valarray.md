#コンストラクタ
```cpp
valarray();                           // (1)
explicit valarray(size_t n);          // (2)
valarray(const T& value, size_t n);   // (3)
valarray(const T* first, size_t n);   // (4)
valarray(const valarray& x);          // (5)
valarray(valarray&& x) noexcept;      // (6) C++11
valarray(const slice_array<T>& x);    // (7)
valarray(const gslice_array<T>& x);   // (8)
valarray(const mask_array<T>& x);     // (9)
valarray(const indirect_array<T>& x); // (10)
valarray(initializer_list<T> init);   // (11) C++11
```
* slice_array[link /reference/valarray/slice_array.md]
* gslice_array[link /reference/valarray/gslice_array.md]
* mask_array[link /reference/valarray/mask_array.md]
* indirect_array[link /reference/valarray/indirect_array.md]
* initializer_list[link /reference/initializer_list.md]

##`valarray`オブジェクトの構築
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
- (11) : 初期化子リストを受け取るコンストラクタ


##効果
- (1) : `size() == 0`の要素を持たない空の`valarray`オブジェクトを構築する。
- (2) : `n`個の`T()`初期化された要素を保持した`valarray`オブジェクトを構築する。
- (3) : `value`のコピーを`n`個要素として保持した`valarray`オブジェクトを構築する。
- (4) : ポインタ`first`が指す要素から`n`個先までをコピーして、`valarray`オブジェクトを構築する。`n`が`first`の要素数より大きい場合、その挙動は未定義。
- (5) : `x`と同じ要素を保持した`valarray`オブジェクトを構築する。
- (6) : `x`と同じ要素を保持した`valarray`オブジェクトを構築する。ムーブ後の`x`の状態は未規定。
- (7), (8), (9), (10) : `x`が参照している要素から、`valarray`オブジェクトを構築する。
- (11) : `valarray(init.begin(), init.size())`と等価。


##計算量
- (6) : 定数時間


##例
```cpp
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& v)
{
  std::cout << name << " : {";
  bool first = true;

  for (const T& x : v) {
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
  std::valarray<int> v1;
  print("v1", v1);

  // (2)
  // 3個の要素を保持するvalarrayオブジェクトを構築。
  // 要素は0(T())で埋められる。
  std::valarray<int> v2(3);
  print("v2", v2);

  // (3)
  // 値1を持つ要素3個からなるvalarrayオブジェクトを構築。
  std::valarray<int> v3(1, 3);
  print("v3", v3);

  // (4)
  // 配列の先頭3要素のコピーからvalarrayオブジェクトを構築。
  int ar4[] = {1, 2, 3, 4};
  std::valarray<int> v4(ar4, 3);
  print("v4", v4);

  // (5)
  // コピー構築。
  std::valarray<int> v5 = v4;
  print("v5", v5);

  // (6)
  // ムーブ構築。
  std::valarray<int> v6 = std::move(v5);
  print("v6", v6);

  // (7)
  // スライスされたvalarrayオブジェクトから構築
  std::valarray<int> v7_org = {1, 2, 3, 4, 5};
  std::valarray<int> v7(v7_org[std::slice(0, 3, 1)]); // 先頭3要素
  print("v7", v7);

  // (8)
  // 行列スライスされたvalarrayオブジェクトから構築
  std::valarray<int> v8_org = {1, 2, 3, 4, 5};
  std::valarray<std::size_t> v8_len = {1, 2, 2};
  std::valarray<std::size_t> v8_stride = {2, 3, 1};
  std::valarray<int> v8 = v8_org[std::gslice(0, v8_len, v8_stride)];
  print("v8", v8);

  // (9)
  // マスクされたvalarrayオブジェクトから構築
  std::valarray<int> v9_org = {1, 2, 3, 4, 5};
  std::valarray<bool> v9_mask = {true, false, true, false, true};
  std::valarray<int> v9 = v9_org[v9_mask];
  print("v9", v9);

  // (1)
  // 初期化子リストから構築
  std::valarray<int> v10 = {1, 2, 3};
  print("v10", v10);
}
```

###出力
```
v1 : {}
v2 : {0,0,0}
v3 : {1,1,1}
v4 : {1,2,3}
v5 : {1,2,3}
v6 : {1,2,3}
v7 : {1,2,3}
v8 : {1,2,4,5}
v9 : {1,3,5}
v10 : {1,2,3}
```


