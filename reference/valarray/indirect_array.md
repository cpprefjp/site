#indirect_array
```cpp
namespace std {
  template <class T>
  class indirect_array;
}
```

##概要
`indirect_array`クラスは、非`const`な[`valarray`](./valarray.md)オブジェクトから`valarray<size_t>`によって抽出した要素を、参照するためのクラスである。抽出条件となる`valarray<size_t>`は、元の`valarray<T>`から抽出する要素のインデックス値から成る配列である。

このクラスのオブジェクトは、[`valarray`](./valarray.md)クラスの[`operator[]`](./valarray/op_at.md)によって返される。

テンプレートパラメータは、以下を意味する：

- `T` : `valarray`クラスの要素型`T`と同じ型


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------|----------------|
| [`(constructor)`](./indirect_array/indirect_array.md) | コンストラクタ | |
| `~indirect_array() = default;`                        | デストラクタ   | |
| [`operator=`](./indirect_array/op_assign.md)          | 代入演算子     | |


###四則演算

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------|------------------|-------|
| [`operator+=`](./indirect_array/op_plus_assign.md)     | 加算の複合代入   | |
| [`operator-=`](./indirect_array/op_minus_assign.md)    | 減算の複合代入   | |
| [`operator*=`](./indirect_array/op_multiply_assign.md) | 乗算の複合代入   | |
| [`operator/=`](./indirect_array/op_divide_assign.md)   | 除算の複合代入   | |
| [`operator%=`](./indirect_array/op_modulo_assign.md)   | 剰余算の複合代入 | |


###ビット演算

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------------|------------------------|-------|
| [`operator&=`](./indirect_array/op_and_assign.md)                | 論理積の複合代入       | |
| [<code>operator&#x7C;=</code>](./indirect_array/op_or_assign.md) | 論理和の複合代入       | |
| [`operator^=`](./indirect_array/op_xor_assign.md)                | 排他的論理和の複合代入 | |
| [`operator<<=`](./indirect_array/op_left_shift_assign.md)        | 左シフトの複合代入     | |
| [`operator>>=`](./indirect_array/op_right_shift_assign.md)       | 右シフトの複合代入     | |


##メンバ型

| 名前         | 説明      | 対応バージョン |
|--------------|-----------|----------------|
| `value_type` | 要素型`T` | |


##例
```cpp
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> v = {1, 2, 3, 4, 5, 6};
  const std::valarray<std::size_t> mask = {1, 3, 5};

  // maskの要素である各インデックス値に
  // 対応する要素のみを抽出する
  std::indirect_array<int> result = v[mask];

  // 抽出した要素を書き換える
  result *= std::valarray<int>(2, 3);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```


###出力
```
1
4
3
8
5
12
```


