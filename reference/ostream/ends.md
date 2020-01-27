# ends
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& ends(basic_ostream<CharT, Traits>& os);
}
```

## 概要
ヌル文�を出力する。

## 効果
`os.`[`put`](basic_ostream/put.md)`(CharT())` を呼び出す。

## 戻り値
`os`

## 備考
本関数は、直接呼ぶのではなく、マニピュレータ関数へのポインタを引数に取る出力演算�（[`operator<<`](basic_ostream/op_ostream.md)、挿入演算�、インサータとも呼ばれる）を通じて呼び出されるのが一般的である。

## 実装例
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os) {
    return os.put(CharT());
  }
}
```
* basic_ostream[link basic_ostream.md]
* put[link basic_ostream/put.md]

## バージョン
### 言語
- C++98

## 参照
- [endl](endl.md)
