# valarray
* valarray[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class T>
  class valarray;
}
```

## 概要
`valarray`は、数値演算に特化した一次元配列クラスである。

配列の全ての要素に対して、同じ操作を効率的に適用できる。たとえば、生配列で以下のように行う演算は、

```cpp
int a[N];
int b[N];
int c[N];

for (std::size_t i = 0; i < N; ++i) {
  c[i] = a[i] + b[i];
}
```

`valarray`では以下のように書ける：

```cpp
valarray<int> a(N);
valarray<int> b(N);

valarray<int> c = a + b;
```

処理系によっては、このような演算を、CPUのSIMD命令によって並列に計算するよう最適化する。

なお、戻り値型に *`ValOrProxy`* と表記している箇所は、[`valarray`](valarray.md)`<T>` か代理の型のいずれかであることを、引数型に *`ValOrProxy`* と表記している箇所は、[`valarray`](valarray.md)`<T>` と代理の型のいずれでも受け取ることが可能であることを表している。  
[`<valarray>`](../valarray.md) の概要も参照のこと。


テンプレートパラメータは、以下を意味する：

- `T` : 配列の要素型


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------------------------------|-----------------------------|-------|
| [`(constructor)`](valarray/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](valarray/op_destructor.md) | デストラクタ   | |
| [`operator=`](valarray/op_assign.md)    | 代入演算�     | |


### 部分演算

| 名前 | 説明 | 対応バージョン |
|-------------------------------------|----------------------|-------|
| [`operator[]`](valarray/op_at.md) | 一部の要素を抽出する | |


### 四則演算

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`operator+` (単項)](valarray/op_unary_plus.md)  | 単項 `+` 演算（符号そのままの要素を得る）| |
| [`operator-` (単項)](valarray/op_unary_minus.md) | 単項 `-` 演算（符号を反転した要素を得る）| |
| [`operator+=`](valarray/op_plus_assign.md)       | 加算の複合代入                           | |
| [`operator-=`](valarray/op_minus_assign.md)      | 減算の複合代入                           | |
| [`operator*=`](valarray/op_multiply_assign.md)   | 乗算の複合代入                           | |
| [`operator/=`](valarray/op_divide_assign.md)     | 除算の複合代入                           | |
| [`operator%=`](valarray/op_modulo_assign.md)     | 剰余算の複合代入                         | |


### ビット演算

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|------------------------------------------|-------|
| [`operator~` (単項)](valarray/op_flip.md)                | 単項 `~` 演算（ビット反転した要素を得る）| |
| [`operator&=`](valarray/op_and_assign.md)                | 論理積の複合代入                         | |
| [<code>operator&#x7C;=</code>](valarray/op_or_assign.md) | 論理和の複合代入                         | |
| [`operator^=`](valarray/op_xor_assign.md)                | 排他的論理和の複合代入                   | |
| [`operator<<=`](valarray/op_left_shift_assign.md)        | 左シフトの複合代入                       | |
| [`operator>>=`](valarray/op_right_shift_assign.md)       | 右シフトの複合代入                       | |


### その他メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------|--------------------------------------------|-------|
| [`swap`](valarray/swap.md)     | 他の`valarray`オブジェクトと値を入れ替える | C++11 |
| [`size`](valarray/size.md)     | 要素数を取得する                           | |
| [`sum`](valarray/sum.md)       | 合計値を求める                             | |
| [`min`](valarray/min.md)       | 最小の要素を取得する                       | |
| [`max`](valarray/max.md)       | 最大の要素を取得する                       | |
| [`shift`](valarray/shift.md)   | 要素の位置をシフトする                     | |
| [`cshift`](valarray/cshift.md) | 要素の位置を循環シフトする                 | |
| [`apply`](valarray/apply.md)   | 各要素に任意の関数を適用する               | |
| [`resize`](valarray/resize.md) | 要素数を変更する                           | |
| [`operator!`](valarray/op_not.md) | 各要素の論理NOTをとる                      | |


## メンバ型

| 名前         | 説明      | 対応バージョン |
|--------------|-----------|----------------|
| `value_type` | 要素型`T` | |


## 非メンバ関数

### 交換

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|-----------------------------------------|-------|
| [`swap`](valarray/swap_free.md) | 2つの`valarray`オブジェクトを入れ替える | C++11 |


### 範囲アクセス

| 名前 | 説明 | 対応バージョン |
|--------------------------------|--------------------------------------|-------|
| [`begin`](valarray/begin_free.md) | 先�の要素を指すイテレータを取得する | C++11 |
| [`end`](valarray/end_free.md)     | 末尾の次を指すイテレータを取得する   | C++11 |


### 四則演算

| 名前 | 説明 | 対応バージョン |
|------------------------------------------|--------|-------|
| [`operator+`](valarray/op_plus.md)     | 加算   | |
| [`operator-`](valarray/op_minus.md)    | 減算   | |
| [`operator*`](valarray/op_multiply.md) | 乗算   | |
| [`operator/`](valarray/op_divide.md)   | 除算   | |
| [`operator%`](valarray/op_modulo.md)   | 剰余算 | |


### ビット演算

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|--------------|-------|
| [`operator&`](valarray/op_and.md)                | 論理積       | |
| [<code>operator&#x7C;</code>](valarray/op_or.md) | 論理和       | |
| [`operator^`](valarray/op_xor.md)                | 排他的論理和 | |
| [`operator<<`](valarray/op_left_shift.md)        | 左シフト     | |
| [`operator>>`](valarray/op_right_shift.md)       | 右シフト     | |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------------|----------------------------------|-------|
| [`operator==`](valarray/op_equal.md)                           | �値比較                         | |
| [`operator!=`](valarray/op_not_equal.md)                       | 非�値比較                       | |
| [`operator<`](valarray/op_less.md)                             | 左辺が右辺より小さいかを判定する | |
| [`operator<=`](valarray/op_less_equal.md)                      | 左辺が右辺以下かを判定する       | |
| [`operator>`](valarray/op_greater.md)                          | 左辺が右辺より大きいかを判定する | |
| [`operator>=`](valarray/op_greater_equal.md)                   | 左辺が右辺以上かを判定する       | |
| [`operator&&`](valarray/op_logical_and.md)                     | 条件式の論理積                   | |
| [<code>operator&#x7C;&#x7C;</code>](valarray/op_logical_or.md) | 条件式の論理和                   | |


### 数�関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------|-------------------------------|-------|
| [`sin`](valarray/sin.md)     | �弦を求める                  | |
| [`cos`](valarray/cos.md)     | 余弦を求める                  | |
| [`tan`](valarray/tan.md)     | �接を求める                  | |
| [`asin`](valarray/asin.md)   | 逆�弦を求める                | |
| [`acos`](valarray/acos.md)   | 逆余弦を求める                | |
| [`atan`](valarray/atan.md)   | 逆�接を求める                | |
| [`atan2`](valarray/atan2.md) | 対辺と隣辺から逆�接を求める  | |
| [`sinh`](valarray/sinh.md)   | 双曲線�弦を求める            | |
| [`cosh`](valarray/cosh.md)   | 双曲線余弦を求める            | |
| [`tanh`](valarray/tanh.md)   | 双曲線�接を求める            | |
| [`exp`](valarray/exp.md)     | 自然対数の底 e の累乗を求める | |
| [`log`](valarray/log.md)     | 自然対数を求める              | |
| [`log10`](valarray/log10.md) | 常用対数を求める              | |
| [`pow`](valarray/pow.md)     | 累乗を求める                  | |
| [`sqrt`](valarray/sqrt.md)   | 平方根を求める                | |
| [`abs`](valarray/abs.md)     | 絶対値を求める                | |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](valarray/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <valarray>

template <class T>
void print(const char* name, const std::valarray<T>& v)
{
  std::cout << name << " : {";
  bool first = true;

  // 範囲for文で全要素を走査する
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
  // 四則演算
  // 全ての要素同士に同じ演算�を適用する
  {
    std::valarray<int> a = {3, 6, 9};
    std::valarray<int> b = {4, 5, 6};

    std::valarray<int> plus = a + b;
    print("add", plus);

    std::valarray<int> minus = a - b;
    print("minus", minus);

    std::valarray<int> multiply = a * b;
    print("multiply", multiply);

    std::valarray<int> divide = a / b;
    print("divide", divide);

    std::valarray<int> modulo = a % b;
    print("modulo", modulo);
  }
  std::cout << std::endl;

  // 数�関数
  // 全ての要素に同じ関数を適用する
  {
    std::valarray<float> a = {0.1f, 0.2f, 0.3f};

    std::valarray<float> sin = std::sin(a);
    print("sin", sin);

    std::valarray<float> cos = std::cos(a);
    print("cos", cos);
  }
  std::cout << std::endl;

  // 配列の一部に対して操作を行う
  {
    std::valarray<int> a = {1, 2, 3, 4, 5, 6};

    const std::size_t start = 1u;  // 開始位置
    const std::size_t length = 3u; // 要素数
    const std::size_t stride = 2u; // 何個置きに処理するか

    // {2, 4, 6}を抽出し、その全要素を* 2する
    a[std::slice(start, length, stride)] *= std::valarray<int> {2, 2, 2};

    print("slice + multiply", a);
  }
}
```
* std::valarray[color ff0000]
* std::sin[link valarray/sin.md]
* std::cos[link valarray/cos.md]
* std::slice[link slice.md]

### 出力
```
add : {7,11,15}
minus : {-1,1,3}
multiply : {12,30,54}
divide : {0,1,1}
modulo : {3,1,3}

sin : {0.0998334,0.198669,0.29552}
cos : {0.995004,0.980067,0.955337}

slice + multiply : {1,4,3,8,5,12}
```

## 参照
- [インテルの valarray の使用](https://www.xlsoft.com/jp/products/intel/compilers/ccw/12/ug/cref_cls/common/cppref_valarray_use.htm)


