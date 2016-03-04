#ValueSwappable
* concepts[meta header]
* std[meta namespace]

##概要
ValueSwappableは、イテレータ要件を満たす型のオブジェクトが、間接参照した値で入れ替え可能かを表す要件である


##要件
- イテレータの要件を満たす型`X`のオブジェクト`x`において、式`*x`によって得られるオブジェクトで[入れ替え可能](Swappable.md)であること

