# has_unique_object_representations
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  struct has_unique_object_representations;

  template <class T>
  inline constexpr bool has_unique_object_representations_v 
    = std::has_unique_object_representations<T>::value;
}
```

## 概要
型`T`の任意の2つの値が、同じ値を持つ場合はそのオブジェクト表現（バイト表現）も同じとなるかどうかを調べる。


## 要件
型`T`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`T`が[*TriviallyCopyable*](is_trivially_copyable.md)であり、`T`の任意の2つの値が等価（equivalent）であるならバイト表現が等値（equal）となる場合に
[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

以下、もう少し詳細な解説。

まず、型`T`のオブジェクト表現とは、`T`のオブジェクトを型`unsigned char[N]`で参照したときのバイト列のことである（`N == sizeof(T)`）。
次に、型`T`の値表現とは、`T`の値を保持するビット列のことである。  
そして、`T`が[*TriviallyCopyable*](is_trivially_copyable.md)であれば、値表現はオブジェクト表現内に含まれる。

この時、`T`の値表現とオブジェクト表現がビット単位で正確に一致していれば`has_unique_object_representations<T>::value == true`となる。  
構造体のパディングはオブジェクト表現に含まれるが、値表現には含まれない。したがって、パディングを持つ構造体は値が同じでもバイト表現が同じとは限らない（結果は`false`となる）。

[スカラー型](is_scalar.md)がこの性質を満たすかは処理系定義となるが、符号なし整数型は一意なオブジェクト表現を持つ。  
またC++20以降、符号付整数型は2の補数表現であると規定されるため、C++20以降は（現在でも多くの処理系がそうであるが）符号付も含めた整数型がこの性質を満たすようになる。  
また、多くの処理系において IEC 559 (IEEE 754) に準拠する浮動小数点型がこの性質を満たさない。

ビットフィールドも処理系によってバイト表現が異なるため処理系定義となる（主に、Itanium ABIとMSVC ABI間で異なる）。

`T`型の二つのオブジェクトが同じ値を持つとは、以下の場合である：

- `T`型の二つのオブジェクトが同じオブジェクト表現を持っており、かつ 
    - `T`が配列なら、2つの配列のそれぞれの要素が同じ値を持つ
    - `T`が共用体でないクラス型なら、対応する非静的メンバ変数が同じ値を持つ
    - `T`が共用体なら、2つの共用体が同じアクティブメンバを持ち、対応するメンバが同じ値を持つ
    - それ以外の場合、その2つのオブジェクトの`operator==`による比較が`true`となる


## 備考

このメタ関数は、簡易にハッシュを求めることを将来サポートする前準備として、ある型のバイト列をそのままその型のハッシュとして利用できるかを判定するために追加された。

おそらく、実装はコンパイラーマジックによって行われ、ユーザーコードで実装することは出来ないと思われる。

## 例

```cpp example
#include <type_traits>
#include <iostream>

struct unique_object_representations {
  int a;
  int b;
};

struct not_unique_object_representations {
  char a;
  // 後続メンバbが配置されるメモリアドレスをint型にとって自然なアライメントとするため、
  // 多くの処理系ではここにパディングを挿入する。例：sizeof(int)==4環境では3バイト。
  // pragmaやコンパイルオプションなど処理系独自の手段でパディング量は調整できることが多い。
  int b;
};

int main()
{
  std::cout << std::boolalpha;

  std::cout << std::has_unique_object_representations<int>::value << std::endl;
  std::cout << std::has_unique_object_representations<unsigned int>::value << std::endl;

  // IEC 559(IEEE 754)準拠の浮動小数点型では、異なるバイト列であっても等価となるケースが存在する。
  // 正のゼロ(+0.0)と負のゼロ(-0.0)は等価と評価されるが、それぞれの値を表すバイト列は異なっている。
  std::cout << std::has_unique_object_representations<float>::value << std::endl;
  std::cout << std::has_unique_object_representations<double>::value << std::endl;

  std::cout << std::has_unique_object_representations<unique_object_representations>::value << std::endl;
  std::cout << std::has_unique_object_representations<not_unique_object_representations>::value << std::endl;
}
```
* std::has_unique_object_representations[color ff0000]

### 出力例
```
true
true
false
false
true
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 6.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 3 [mark verified]


## 関連項目
- [C++20 符号付き整数型が2の補数表現であることを規定](/lang/cpp20/signed_integers_are_twos_complement.md)


## 参照
- [C++1z has_unique_object_representations型特性 - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/09/23/143031)
- [What type will make “std::has_unique_object_representations” return false? - Stack Overflow](https://stackoverflow.com/questions/42855326/what-type-will-make-stdhas-unique-object-representations-return-false)
- [P0258R1 is_contiguous_layout](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0258r1.html)
- [P0258R2 has_unique_object_representations - wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0258r2.html)
