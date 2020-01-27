# indirect_array
* valarray[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  class indirect_array;
}
```

## 概要
`indirect_array`クラスは、非`const`な[`valarray`](valarray.md)オブジェクトから`valarray<size_t>`によって抽出した要素を、参照するためのクラスである。抽出条件となる`valarray<size_t>`は、元の`valarray<T>`から抽出する要素のインデックス値から成る配列である。

このクラスのオブジェクトは、[`valarray`](valarray.md)クラスの[`operator[]`](valarray/op_at.md)によって返される。

なお、メンバ関数の引数型に *`ValOrProxy`* と表記している箇所は、[`valarray`](valarray.md)`<T>` と代理の型のいずれでも受け取ることが可能であることを表している。  
[`<valarray>`](../valarray.md) の概要も参照のこと。

テンプレートパラメータは、以下を意味する：

- `T` : [`valarray`](valarray.md)クラスの要素型`T`と同じ型


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------|----------------|
| [`(constructor)`](indirect_array/op_constructor.md) | コンストラクタ | |
| `~indirect_array() = default;`                        | デストラクタ   | |
| [`operator=`](indirect_array/op_assign.md)          | 代入演算�     | |


### 四則演算

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------|------------------|-------|
| [`operator+=`](indirect_array/op_plus_assign.md)     | 加算の複合代入   | |
| [`operator-=`](indirect_array/op_minus_assign.md)    | 減算の複合代入   | |
| [`operator*=`](indirect_array/op_multiply_assign.md) | 乗算の複合代入   | |
| [`operator/=`](indirect_array/op_divide_assign.md)   | 除算の複合代入   | |
| [`operator%=`](indirect_array/op_modulo_assign.md)   | 剰余算の複合代入 | |


### ビット演算

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------------|------------------------|-------|
| [`operator&=`](indirect_array/op_and_assign.md)                | 論理積の複合代入       | |
| [<code>operator&#x7C;=</code>](indirect_array/op_or_assign.md) | 論理和の複合代入       | |
| [`operator^=`](indirect_array/op_xor_assign.md)                | 排他的論理和の複合代入 | |
| [`operator<<=`](indirect_array/op_left_shift_assign.md)        | 左シフトの複合代入     | |
| [`operator>>=`](indirect_array/op_right_shift_assign.md)       | 右シフトの複合代入     | |


## メンバ型

| 名前         | 説明      | 対応バージョン |
|--------------|-----------|----------------|
| `value_type` | 要素型`T` | |


## 例
```cpp example
#include <iostream>
#include <valarray>

int main()
{
  std::valarray<int> va = {1, 2, 3, 4, 5, 6};
  const std::valarray<std::size_t> mask = {1, 3, 5};

  // maskの要素である各インデックス値に
  // 対応する要素のみを抽出する
  std::indirect_array<int> result = va[mask];

  // 抽出した要素を書き換える
  result *= std::valarray<int>(2, mask.size());

  for (int x : va) {
    std::cout << x << std::endl;
  }
}
```
* std::indirect_array[color ff0000]
* std::valarray[link valarray.md]
* mask.size()[link valarray/size.md]

### 出力
```
1
4
3
8
5
12
```


