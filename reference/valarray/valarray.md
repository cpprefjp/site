#valarray
線形代数学的な数値例の計算に特化したクラステンプレート。


##メンバ関数

| | |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `(constructor)`              | `size_t `、 `valarray` 、 `slice_array` 、 `gslice_array` 、 `mask_array` 、 `indirect_array` 、 `initializer_list` の何れかをパラメータとして `valarray` を生成する |
| `(destructor)`               |（特記事項なし） |
| `operator=`                  | `valarray` 、 `slice_array` 、 `gslice_array` 、 `mask_array` 、 `indirect_array` 、 `initializer_list` の何れかを代入する |
| `operator[]`                 | `size_t` 、 `slice` 、 `gslice` 、 `valarray<bool>` 、 `valarray<size_t>` の何れかをパラメータとし、対応する要素、または要素の集合を生成して返す<br/>（各パラメータ型を与えた場合の挙動は例2を参照）  |
| `operator+` (単項演算子)     | 自身のコピーを返す |
| `operator-` (単項演算子)     | 自身のコピーを返す |
| `operator~` (単項演算子)     | 自身のコピーを返す |
| `operator*=`                 | 乗算 |
| `operator/=`                 | 除算 |
| `operator%=`                 | 剰余算 |
| `operator+=`                 | 加算 |
| `operator-=`                 | 減算  |
| `operator^=`                 | 排他的論理和のビット演算 |
| `operator&=`                 | 論理積のビット演算 |
| <code>operator&#x7C;=</code> | 論理和のビット演算 |
| `operator<<=`                | 左シフト |
| `operator>>=`                | 右シフト |
| `swap`                       | 他の`valarray`オブジェクトと値を入れ替える(C++11) |
| `size`                       | 要素数を取得する |
| `sum`                        | 合計値を求める |
| `min`                        | 最小の要素を取得する |
| `max`                        | 最大の要素を取得する |
| `shift`                      | 各要素をシフトする |
| `cshift`                     | 各要素を循環シフトする |
| `apply`                      | 各要素に任意の関数オブジェクトを適用する |

##非メンバ関数
### `valarray` のための演算子

| | |
|-----------------------------------|----------------------------------|
| `operator*`                       | 乗算                             |
| `operator/`                       | 除算                             |
| `operator%`                       | 剰余算                           |
| `operator+`                       | 加算                             |
| `operator-`                       | 減算                             |
| `operator^`                       | 排他的論理和のビット演算         |
| `operator&`                       | 論理積のビット演算               |
| <code>operator&#x7C;</code>       | 論理和のビット演算               |
| `operator<<`                      | 左シフト                         |
| `operator>>`                      | 右シフト                         |
| `operator==`                      | 等値比較                         |
| `operator!=`                      | 非等値比較                       |
| `operator<`                       | 左辺が右辺より小さいかを判定する |
| `operator<=`                      | 左辺が右辺以下かを判定する       |
| `operator>`                       | 左辺が右辺より大きいかを判定する |
| `operator>=`                      | 左辺が右辺以上かを判定する       |
| `operator&&`                      | 論理積                           |
| <code>operator&#x7C;&#x7C;</code> | 論理和                           |


### `valarray` のための数学関数

| | |
|---------|--------------------------------------------------|
| `sin`   | 正弦関数（サイン）                               |
| `cos`   | 余弦関数（コサイン）                             |
| `tan`   | 正接関数（タンジェント）                         |
| `asin`  | 逆正弦関数（アークサイン）                       |
| `acos`  | 逆余弦関数（アークコサイン）                     |
| `atan`  | 逆正接関数（アークタンジェント）                 |
| `atan2` | 対辺と隣辺からの逆正接関数（アークタンジェント） |
| `sinh`  | 双曲線正弦関数（ハイパボリックサイン）           |
| `cosh`  | 双曲線余弦関数（ハイパボリックコサイン）         |
| `tanh`  | 双曲線正接関数（ハイパボリックタンジェント）     |
| `exp`   | e (ネイピア数) を底とする指数関数                |
| `log`   | e (ネイピア数) を底とする自然対数                |
| `log10` | 10 を底とする常用対数                            |
| `pow`   | 冪乗                                             |
| `sqrt`  | 平方根                                           |
| `abs`   | 絶対値                                           |



##例１ `valarray` クラステンプレートの基礎的な挙動

```cpp
#include <valarray>
#include <iostream>
int main(){
  typedef char v_type;
  typedef std::valarray<v_type> a_type;
  
  auto debug_print = [](const a_type& a){
    static size_t counter = 0;
    std::cerr << "debug_print[" << counter << "]: ";
    for(auto v: a)
      std::cerr << v << " ";
    std::cerr << "\n";
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
int main(){
  typedef char v_type;
  typedef std::valarray<v_type> a_type;
  
  auto debug_print = [](const a_type& a){
    static size_t counter = 0;
    std::cerr << "debug_print[" << counter << "]: ";
    for(auto v: a)
      std::cerr << v << " ";
    std::cerr << "\n";
    ++counter;
  };

  const size_t a_length = 'Z' - 'A' + 1;
  a_type a(a_length);
  std::iota(&a[0], &a[a_length], 'A');
  debug_print(a);
  
  std::cerr << "*** operator[](size_t) ***\n";
  for(size_t v: {0,1,2,3,4,5,6,7,8})
    std::cerr << a[v];
  std::cerr << "\n";

  std::cerr << "*** operator[](slice) ***\n";
  debug_print( a[std::slice(0,2,3)] );
  {
    auto b = a;
    b[std::slice(0,2,3)] = {'x','y'};
    debug_print(b);
    b[std::slice(1,3,3)] = '!';
    debug_print(b);
  }

  std::cerr << "*** operator[](gslice) ***\n";
  debug_print( a[std::gslice(
    2,
    std::valarray<size_t>({2,3,1}),
    std::valarray<size_t>({13,3,1})
  )] );

  std::cerr << "*** operator[](valarray<bool>) ***\n";
  debug_print( a[std::valarray<bool>({false,false,true,true,false,true})] );

  std::cerr << "*** operator[](valarray<size_t>) ***\n";
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

