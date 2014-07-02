#valarray
```cpp
namespace std {
  template <class T>
  class valarray;
}
```

##概要
`valarray`は、数値演算に特化した一次元配列クラスである。

配列の全ての要素に対して、同じ操作を効率的に適用できる。たとえば、生配列で以下のように行う演算は、

```cpp
int a[N];
int b[N];
int c[N];

for (size_t i = 0; i < N; ++i) {
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


テンプレートパラメータは、以下を意味する：

- `T` : 配列の要素型


##メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------|--------------------------------------------|-------|
| `(constructor)`              | コンストラクタ                             | |
| `(destructor)`               | デストラクタ                               | |
| `operator=`                  | 代入演算子                                 | |
| `operator[]`                 | 一部の要素を抽出する                       | |
| `operator+` (単項演算子)     | 自身のコピーを返す                         | |
| `operator-` (単項演算子)     | 自身のコピーを返す                         | |
| `operator~` (単項演算子)     | 自身のコピーを返す                         | |
| `operator*=`                 | 乗算                                       | |
| `operator/=`                 | 除算                                       | |
| `operator%=`                 | 剰余算                                     | |
| `operator+=`                 | 加算                                       | |
| `operator-=`                 | 減算                                       | |
| `operator^=`                 | 排他的論理和のビット演算                   | |
| `operator&=`                 | 論理積のビット演算                         | |
| <code>operator&#x7C;=</code> | 論理和のビット演算                         | |
| `operator<<=`                | 左シフト                                   | |
| `operator>>=`                | 右シフト                                   | |
| `swap`                       | 他の`valarray`オブジェクトと値を入れ替える | C++11 |
| `size`                       | 要素数を取得する                           | |
| `sum`                        | 合計値を求める                             | |
| `min`                        | 最小の要素を取得する                       | |
| `max`                        | 最大の要素を取得する                       | |
| `shift`                      | 各要素をシフトする                         | |
| `cshift`                     | 各要素を循環シフトする                     | |
| `apply`                      | 各要素に任意の関数を適用する               | |


##メンバ型

| 名前         | 説明      | 対応バージョン |
|--------------|-----------|----------------|
| `value_type` | 要素型`T` | |


##非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|-----------------------------------------|-------|
| `swap`                            | 2つの`valarray`オブジェクトを入れ替える | C++11 |


###範囲アクセス

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|--------------------------------------|-------|
| `begin`                           | 先頭の要素を指すイテレータを取得する | C++11 |
| `end`                             | 末尾の次を指すイテレータを取得する   | C++11 |


###四則演算

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------------------------|-------|
| `operator*`                       | 乗算                             | |
| `operator/`                       | 除算                             | |
| `operator%`                       | 剰余算                           | |
| `operator+`                       | 加算                             | |
| `operator-`                       | 減算                             | |


###ビット演算

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------------------------|-------|
| `operator^`                       | 排他的論理和のビット演算         | |
| `operator&`                       | 論理積のビット演算               | |
| <code>operator&#x7C;</code>       | 論理和のビット演算               | |
| `operator<<`                      | 左シフト                         | |
| `operator>>`                      | 右シフト                         | |
| `operator&&`                      | 論理積                           | |
| <code>operator&#x7C;&#x7C;</code> | 論理和                           | |


###比較演算

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|----------------------------------|-------|
| `operator==`                      | 等値比較                         | |
| `operator!=`                      | 非等値比較                       | |
| `operator<`                       | 左辺が右辺より小さいかを判定する | |
| `operator<=`                      | 左辺が右辺以下かを判定する       | |
| `operator>`                       | 左辺が右辺より大きいかを判定する | |
| `operator>=`                      | 左辺が右辺以上かを判定する       | |


###数学関数

| 名前 | 説明 | 対応バージョン |
|---------|--------------------------------------------------|-------|
| `sin`   | 正弦関数（サイン）                               | |
| `cos`   | 余弦関数（コサイン）                             | |
| `tan`   | 正接関数（タンジェント）                         | |
| `asin`  | 逆正弦関数（アークサイン）                       | |
| `acos`  | 逆余弦関数（アークコサイン）                     | |
| `atan`  | 逆正接関数（アークタンジェント）                 | |
| `atan2` | 対辺と隣辺からの逆正接関数（アークタンジェント） | |
| `sinh`  | 双曲線正弦関数（ハイパボリックサイン）           | |
| `cosh`  | 双曲線余弦関数（ハイパボリックコサイン）         | |
| `tanh`  | 双曲線正接関数（ハイパボリックタンジェント）     | |
| `exp`   | e (ネイピア数) を底とする指数関数                | |
| `log`   | e (ネイピア数) を底とする自然対数                | |
| `log10` | 10 を底とする常用対数                            | |
| `pow`   | 冪乗                                             | |
| `sqrt`  | 平方根                                           | |
| `abs`   | 絶対値                                           | |



##例１ `valarray` クラステンプレートの基礎的な挙動

```cpp
#include <valarray>
#include <iostream>

int main(){
  typedef char v_type;
  typedef std::valarray<v_type> a_type;
  
  auto debug_print = [](const a_type& a){
    static size_t counter = 0;
    std::cout << "debug_print[" << counter << "]: ";
    for(auto v: a)
      std::cout << v << " ";
    std::cout << "\n";
    ++counter;
  };

  a_type a = {'A','B','C','D','E','F','G','H','I'};
  debug_print(a);
  
  debug_print( a - v_type(3) );
  debug_print( a.apply([](const v_type& v)->v_type{ return v * v % ('Z' - 'A') + 'A';}) ); 

  a += a_type({1,2,3,4,5,6,7,8,9});
  debug_print(a);
}
```
* std::valarray[color ff0000]
* apply[color ff0000]

###出力
```
debug_print[0]: A B C D E F G H I 
debug_print[1]: > ? @ A B C D E F 
debug_print[2]: A G O Y L A Q J E 
debug_print[3]: B D F H J L N P R 
```

##例２ `valarray` クラステンプレートの `operator[]` メンバ関数の挙動

```cpp
#include <valarray>
#include <iostream>
#include <numeric>

int main(){
  typedef char v_type;
  typedef std::valarray<v_type> a_type;
  
  auto debug_print = [](const a_type& a){
    static size_t counter = 0;
    std::cout << "debug_print[" << counter << "]: ";
    for(auto v: a)
      std::cout << v << " ";
    std::cout << "\n";
    ++counter;
  };

  const size_t a_length = 'Z' - 'A' + 1;
  a_type a(a_length);
  std::iota(&a[0], &a[a_length], 'A');
  debug_print(a);
  
  std::cout << "*** operator[](size_t) ***\n";
  for(size_t v: {0,1,2,3,4,5,6,7,8})
    std::cout << a[v];
  std::cout << "\n";

  std::cout << "*** operator[](slice) ***\n";
  debug_print( a[std::slice(0,2,3)] );
  {
    auto b = a;
    b[std::slice(0,2,3)] = a_type({'x','y'});
    debug_print(b);
    b[std::slice(1,3,3)] = '!';
    debug_print(b);
  }

  std::cout << "*** operator[](gslice) ***\n";
  debug_print( a[std::gslice(
    2,
    std::valarray<size_t>({2,3,1}),
    std::valarray<size_t>({13,3,1})
  )] );

  std::cout << "*** operator[](valarray<bool>) ***\n";
  debug_print( a[std::valarray<bool>({false,false,true,true,false,true})] );

  std::cout << "*** operator[](valarray<size_t>) ***\n";
  debug_print( a[std::valarray<size_t>({19,4,0,19,8,12,4})] );
}
```
* std::valarray[color ff0000]

###出力
```
debug_print[0]: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 
*** operator[](size_t) ***
ABCDEFGHI
*** operator[](slice) ***
debug_print[1]: A D 
debug_print[2]: x B C y E F G H I J K L M N O P Q R S T U V W X Y Z 
debug_print[3]: x ! C y ! F G ! I J K L M N O P Q R S T U V W X Y Z 
*** operator[](gslice) ***
debug_print[4]: C F I P S V 
*** operator[](valarray<bool>) ***
debug_print[5]: C D F 
*** operator[](valarray<size_t>) ***
debug_print[6]: T E A T I M E 
```

