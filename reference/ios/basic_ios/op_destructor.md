# デストラクタ
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
virtual ~basic_ios(); // (1) C++98
```


## 概要
ストリームオブジェクトを破棄する。


## 備考
デストラクタでは、[`rdbuf`](rdbuf.md)`()` が指すストリームバッファオブジェクトは破棄しない。


## バージョン
### 言語
- C++98


## 参照
- [`ios_base`](../ios_base.md)`::`[`~ios_base`](../ios_base/op_destructor.md)
