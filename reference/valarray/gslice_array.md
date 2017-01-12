#gslice_array
* valarray[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  class gslice_array;
}
```

##概要
`gslice_array`クラスは、非`const`な[`valarray`](valarray.md)オブジェクトから[`gslice`](gslice.md)によって抽出した要素を、参照するためのクラスである。`gslice`は、`valarray`オブジェクトを行列指定で抽出する機能と見なせる。

このクラスのオブジェクトは、[`valarray`](valarray.md)クラスの[`operator[]`](valarray/op_at.md)によって返される。


テンプレートパラメータは、以下を意味する：

- `T` : `valarray`クラスの要素型`T`と同じ型


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|----------------|----------------|
| [`(constructor)`](gslice_array/op_constructor.md) | コンストラクタ | |
| `~gslice_array() = default;`                     | デストラクタ   | |
| [`operator=`](gslice_array/op_assign.md)       | 代入演算子     | |


###四則演算

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|------------------|-------|
| [`operator+=`](gslice_array/op_plus_assign.md)     | 加算の複合代入   | |
| [`operator-=`](gslice_array/op_minus_assign.md)    | 減算の複合代入   | |
| [`operator*=`](gslice_array/op_multiply_assign.md) | 乗算の複合代入   | |
| [`operator/=`](gslice_array/op_divide_assign.md)   | 除算の複合代入   | |
| [`operator%=`](gslice_array/op_modulo_assign.md)   | 剰余算の複合代入 | |


###ビット演算

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|------------------------|-------|
| [`operator&=`](gslice_array/op_and_assign.md)                | 論理積の複合代入       | |
| [<code>operator&#x7C;=</code>](gslice_array/op_or_assign.md) | 論理和の複合代入       | |
| [`operator^=`](gslice_array/op_xor_assign.md)                | 排他的論理和の複合代入 | |
| [`operator<<=`](gslice_array/op_left_shift_assign.md)        | 左シフトの複合代入     | |
| [`operator>>=`](gslice_array/op_right_shift_assign.md)       | 右シフトの複合代入     | |


##メンバ型

| 名前         | 説明      | 対応バージョン |
|--------------|-----------|----------------|
| `value_type` | 要素型`T` | |


##例
```cpp
#include <iostream>
#include <iomanip> // setw
#include <valarray>
#include <numeric> // iota

const std::size_t x_size = 4;
const std::size_t y_size = 4;

std::size_t make_position(std::size_t x, std::size_t y)
{
  return x_size * y + x;
}

int main()
{
  // 4x4の行列
  std::valarray<int> va(x_size * y_size);
  std::iota(std::begin(va), std::end(va), 0); // 0からの連番にする

  // (1,1)の位置から、横に3要素、縦に2要素を抽出する
  const std::size_t start = make_position(1, 1);
  const std::valarray<std::size_t> lengths = {3u, 2u};
  const std::valarray<std::size_t> strides = {x_size, 1u};

  // 抽出した要素を99で埋める
  // v[std::gslice(...)]で返されるオブジェクトがgslice_array
  va[std::gslice(start, lengths, strides)] = 99;

  // 行列を出力
  for (std::size_t i = 0; i < va.size(); ++i) {
    std::cout << std::setw(2) << va[i] << ' ';
    const std::size_t x = i % x_size;
    if (x == x_size - 1)
      std::cout << std::endl;
  }
}
```

###出力
```
 0  1  2  3 
 4 99 99  7 
 8 99 99 11 
12 99 99 15 
```


