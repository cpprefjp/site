#gslice_array
```cpp
namespace std {
  template <class T>
  class gslice_array;
}
```

##概要
`gslice_array`クラスは、非`const`な[`valarray`](./valarray.md)オブジェクトから[`gslice`](./slice.md)によって抽出した要素を、参照するためのクラスである。

このクラスのオブジェクトは、[`valarray`](./valarray.md)クラスの[`operator[]`](./valarray/op_at.md)によって返される。


テンプレートパラメータは、以下を意味する：

- `T` : `valarray`クラスの要素型`T`と同じ型


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|----------------|----------------|
| [`(constructor)`](./gslice_array/gslice_array.md) | コンストラクタ | |
| `~gslice_array() = default;`                     | デストラクタ   | |
| [`operator=`](./gslice_array/op_assign.md)       | 代入演算子     | |


###四則演算

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------------|------------------|-------|
| [`operator+=`](./gslice_array/op_plus_assign.md)     | 加算の複合代入   | |
| [`operator-=`](./gslice_array/op_minus_assign.md)    | 減算の複合代入   | |
| [`operator*=`](./gslice_array/op_multiply_assign.md) | 乗算の複合代入   | |
| [`operator/=`](./gslice_array/op_divide_assign.md)   | 除算の複合代入   | |
| [`operator%=`](./gslice_array/op_modulo_assign.md)   | 剰余算の複合代入 | |


###ビット演算

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------|------------------------|-------|
| [`operator&=`](./gslice_array/op_and_assign.md)                | 論理積の複合代入       | |
| [<code>operator&#x7C;=</code>](./gslice_array/op_or_assign.md) | 論理和の複合代入       | |
| [`operator^=`](./gslice_array/op_xor_assign.md)                | 排他的論理和の複合代入 | |
| [`operator<<=`](./gslice_array/op_left_shift_assign.md)        | 左シフトの複合代入     | |
| [`operator>>=`](./gslice_array/op_right_shift_assign.md)       | 右シフトの複合代入     | |


##メンバ型

| 名前         | 説明      | 対応バージョン |
|--------------|-----------|----------------|
| `value_type` | 要素型`T` | |


##例
```cpp
#include <iostream>
#include <valarray>
#include <numeric> // iota

int main()
{
  std::valarray<int> v(15);
  std::iota(std::begin(v), std::end(v), 0); // 0からの連番にする

  const std::size_t start = 1u;
  const std::valarray<std::size_t> lengths = {3u, 2u};
  const std::valarray<std::size_t> strides = {5u, 3u};

  std::gslice_array<int> result = v[std::gslice(start, lengths, strides)];

  // 抽出した要素を99で埋める
  result = 99;

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```

###出力
```
1
2
3
99
99
6
7
8
99
10
99
12
13
99
```


